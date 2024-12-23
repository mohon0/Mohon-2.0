import generateCode from "@/components/helper/mail/GenerateCode";
import sendVerificationEmail, {
  sendRegistrationEmail,
} from "@/components/helper/mail/SendMail";
import { Prisma } from "@/components/helper/prisma/Prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { name, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!name || !email || !password) {
      return new NextResponse("Missing name, email, or password", {
        status: 400,
      });
    }

    const existingUser = await Prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser?.emailVerified) {
      return new NextResponse("Email is already registered", { status: 409 });
    } else if (existingUser?.emailVerified === null) {
      // Update the existing user with data from the request
      const updatedUser = await Prisma.user.update({
        where: {
          email: email,
        },
        data: {
          name,
          password: hashedPassword,
          emailVerified: null,
          verificationCode: null,
        },
      });

      // Send verification code
      const verificationCode = generateCode();
      await sendVerificationEmail(email, verificationCode);

      // Save the verification code in the database
      await Prisma.user.update({
        where: { id: updatedUser.id },
        data: { verificationCode: verificationCode },
      });

      return new NextResponse(
        JSON.stringify({
          message: "Verification code sent successfully",
          userId: updatedUser.id,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } else {
      const user = await Prisma.user.create({
        data: {
          name,
          email,
          status: "USER",
          password: hashedPassword,
          emailVerified: null,
          verificationCode: null,
        },
      });

      // Send verification code
      const verificationCode = generateCode();
      await sendVerificationEmail(email, verificationCode);

      // Save the verification code in the database
      await Prisma.user.update({
        where: { id: user.id },
        data: { verificationCode: verificationCode },
      });

      return new NextResponse(
        JSON.stringify({
          message: "Verification code sent successfully",
          userId: user.id,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  } finally {
    await Prisma.$disconnect();
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { userId, code } = data;

    const user = await Prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const verificationCode = code.toString();

    // Check if the verification code matches
    if (user.verificationCode === verificationCode) {
      const updatedUser = await Prisma.user.update({
        where: { id: userId },
        data: {
          emailVerified: new Date().toISOString(),
          verificationCode: null,
        },
      });

      if (updatedUser.email) {
        // Check if the email is already subscribed
        const existingSubscriber = await Prisma.subscriber.findUnique({
          where: { email: updatedUser.email },
        });

        if (!existingSubscriber) {
          // Save email to subscriber list
          await Prisma.subscriber.create({
            data: { email: updatedUser.email },
          });
        }

        // Send welcome email
        try {
          await sendRegistrationEmail(updatedUser.email);
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError);
          return NextResponse.json(
            {
              message:
                "Registration successful, but welcome email could not be sent.",
            },
            { status: 202 },
          );
        }
      }

      return new NextResponse("User verified successfully", { status: 200 });
    } else {
      return new NextResponse("Invalid verification code", { status: 400 });
    }
  } catch (error) {
    console.error("Error during verification:", error);
    return new NextResponse("Internal server error", { status: 500 });
  } finally {
    await Prisma.$disconnect();
  }
}
