import { FaRegShareFromSquare } from "react-icons/fa6";

export default function QuickMenu() {
  return (
    <div>
      <p className="mb-8 text-center text-4xl font-bold">Quick Menu</p>
      <div className="flex justify-between gap-4 rounded-lg border border-primary p-4">
        <div className="white-bg dark:bg-dark flex h-32 w-32 flex-col items-center justify-center gap-4 p-4">
          <FaRegShareFromSquare />
          <p>Notice</p>
        </div>
        <div className="white-bg dark:bg-dark flex h-32 w-32 flex-col items-center justify-center gap-4 p-4">
          <FaRegShareFromSquare />
          <p>Result</p>
        </div>
        <div className="white-bg dark:bg-dark flex h-32 w-32 flex-col items-center justify-center gap-4 p-4">
          <FaRegShareFromSquare />
          <p>Apply</p>
        </div>
      </div>
    </div>
  );
}
