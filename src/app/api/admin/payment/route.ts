import { Prisma } from "@/components/helper/prisma/Prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract query parameters
    const url = new URL(request.url);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    const whereCondition: any = {};
    if (startDate) whereCondition.createdAt = { gte: new Date(startDate) };
    if (endDate)
      whereCondition.createdAt = {
        ...whereCondition.createdAt,
        lte: new Date(endDate),
      };

    // Fetch transactions from Prisma
    const transactions = await Prisma.transaction.findMany({
      where: whereCondition,
      select: {
        amount: true,
        createdAt: true,
        PaymentMonth: true,
      },
    });

    if (!transactions.length) {
      return NextResponse.json(
        { message: "No transactions found", data: {} },
        { status: 200 },
      );
    }

    // Aggregate data by month
    const monthlyData = transactions.reduce(
      (acc, tx) => {
        const month = new Date(tx.PaymentMonth).toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        });

        if (!acc[month]) {
          acc[month] = { payments: 0, refunds: 0 };
        }

        if (tx.amount >= 0) {
          acc[month].payments += tx.amount;
        } else {
          acc[month].refunds += Math.abs(tx.amount);
        }

        return acc;
      },
      {} as Record<string, { payments: number; refunds: number }>,
    );

    // Sort months correctly
    const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
      return new Date(`${a} 1`).getTime() - new Date(`${b} 1`).getTime();
    });

    // Format data for charts
    const labels = sortedMonths;
    const paymentsData = labels.map((month) => monthlyData[month].payments);
    const refundsData = labels.map((month) => monthlyData[month].refunds);

    return NextResponse.json({
      summary: {
        totalPayments: paymentsData.reduce((sum, val) => sum + val, 0),
        totalRefunds: refundsData.reduce((sum, val) => sum + val, 0),
        netAmount:
          paymentsData.reduce((sum, val) => sum + val, 0) -
          refundsData.reduce((sum, val) => sum + val, 0),
      },
      chartData: {
        labels,
        datasets: [
          {
            label: "Payments",
            data: paymentsData,
            borderColor: "#4CAF50",
            backgroundColor: "#A5D6A7",
          },
          {
            label: "Refunds",
            data: refundsData,
            borderColor: "#F44336",
            backgroundColor: "#FFCDD2",
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error fetching transaction analytics:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
