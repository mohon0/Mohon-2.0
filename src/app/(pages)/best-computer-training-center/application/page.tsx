"use client";

import { FetchUserApplication } from "@/components/fetch/best-computer/FetchApplication";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import {
  CalendarIcon,
  ClockIcon,
  GraduationCapIcon,
  Loader2,
} from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ScrollNotice from "../ScrollNotice";
import ApplicationHeader from "./ApplicationHeader";
import { StudentApplicationForm } from "./StudentApplication";

export default function Application() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ApplicationContent />
    </Suspense>
  );
}

function ApplicationContent() {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <LoadingSkeleton />;
  }

  if (status === "unauthenticated") {
    return <VisitorView />;
  }

  if (status === "authenticated" && session.user) {
    return (
      <>
        <Content />
      </>
    );
  }

  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        An unexpected error occurred. Please try again later.
      </AlertDescription>
    </Alert>
  );
}

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto mt-10 px-4">
      <Skeleton className="mb-4 h-8 w-64" />
      <Card>
        <CardHeader>
          <Skeleton className="mb-2 h-8 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
            <Skeleton className="mt-6 h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function VisitorView() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Welcome to the Application Page</CardTitle>
          <CardDescription>
            Please log in to access the application form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This page is restricted to authenticated users. If you have an
            account, please log in to continue. If you don&#39;e an account,
            please register first.
          </p>
          <Button onClick={() => signIn()} className="w-full">
            Log In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Content() {
  const { isLoading, data, isError } = FetchUserApplication();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          An unexpected error occurred. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (data === "No Application Found") {
    return (
      <div className="container mx-auto px-4 py-8">
        <ScrollNotice />
        <ApplicationHeader />
        <StudentApplicationForm />
      </div>
    );
  }

  return <UserApplicationCard application={data} />;
}

interface UserApplication {
  id: string;
  studentName: string;
  duration: string;
  image: string;
  status: string;
  course: string;
  createdAt: string;
  certificate: string;
}

interface UserApplicationCardProps {
  application: UserApplication;
}

function UserApplicationCard({ application }: UserApplicationCardProps) {
  const {
    studentName,
    duration,
    image,
    status,
    course,
    createdAt,
    certificate,
    id,
  } = application;
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
    }
  };

  async function handleDelete(id: string) {
    try {
      toast.loading("Please wait...");
      const response = await axios.delete(
        `/api/best-computer/application?id=${id}`,
      );
      if (response.status === 200) {
        toast.dismiss();
        toast.success("Successfully deleted");
        router.refresh();
      } else {
        toast.dismiss();
        toast.error("Error deleting application");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error deleting application");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mx-auto my-10 w-full max-w-2xl overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:border-blue-800 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="flex flex-col items-center gap-4 bg-white p-6 dark:bg-gray-800 sm:flex-row">
          <Avatar className="h-24 w-24 border-4 border-blue-200 dark:border-blue-700">
            <AvatarImage src={image} alt={studentName} />
            <AvatarFallback className="text-2xl">
              {studentName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl font-bold text-blue-800 dark:text-blue-300">
              {studentName}
            </CardTitle>
            <Badge className={`mt-2 ${getStatusColor(status)}`}>
              <span className="flex items-center gap-1">
                {getStatusIcon(status)}
                {status}
              </span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 p-6">
          <motion.div
            className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <GraduationCapIcon className="h-6 w-6 text-blue-500" />
            <span className="text-lg font-medium">{course}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ClockIcon className="h-6 w-6 text-green-500" />
            <span className="font-medium">{duration}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CalendarIcon className="h-6 w-6 text-purple-500" />
            <span>{formatDate(createdAt)}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Badge variant="outline" className="border-2 px-3 py-1 text-lg">
              {certificate}
            </Badge>
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 bg-gray-50 p-6 dark:bg-gray-900">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/dashboard/application-list/single-application?id=${id}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    View
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View full application details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/dashboard/application-list/edit-application?id=${id}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-green-500 text-white hover:bg-green-600"
                  >
                    Edit
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit application information</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <FaTrash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Application data will be deleted from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
}