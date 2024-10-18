import { Button } from "@/components/ui/button";
import img from "@/images/contact1.png";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { LuFacebook, LuGithub } from "react-icons/lu";
import { SlSocialLinkedin } from "react-icons/sl";

export default function Contact() {
  return (
    <div className="mx-3 my-10 md:mx-10 lg:mx-32">
      <header className="text-center">
        <h2 className="my-4 text-4xl font-bold lg:text-6xl">Contact With Me</h2>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
        <article className="white-bg dark:dark-bg col-span-1 rounded-lg p-4 md:col-span-5 md:p-6">
          <Image
            src={img}
            alt="Sejar Parvez"
            className="h-40 w-full rounded object-cover md:h-56"
          />
          <div className="my-4 space-y-2">
            <p className="text-3xl font-bold">Md. Mohon</p>
            <p className="text-gray-200">Full Stack Developer</p>
          </div>
          <p className="mb-4 leading-7 text-muted-foreground">
            I am available for freelance work. Connect with me via and call in
            to my account.
          </p>
          <p>Phone: +01234567890</p>
          <p>Email: admin@example.com</p>

          <section className="mt-12 space-y-3 md:mt-16">
            <p className="text-muted-foreground">Connect With Me</p>
            <div className="flex gap-5">
              {[
                {
                  href: "https://www.facebook.com/sejarparvez",
                  icon: <LuFacebook />,
                  label: "Facebook",
                },
                {
                  href: "https://www.twitter.com/sejarparvez",
                  icon: <FaXTwitter />,
                  label: "Twitter",
                },
                {
                  href: "https://linkedin.com/in/sejarparvez",
                  icon: <SlSocialLinkedin />,
                  label: "LinkedIn",
                },
                {
                  href: "https://www.github.com/sejarparvez",
                  icon: <LuGithub />,
                  label: "GitHub",
                },
              ].map(({ href, icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  className="white-bg dark:dark-bg flex h-12 w-12 items-center justify-center rounded text-xl transition-all duration-300 hover:border hover:border-primary hover:text-primary md:h-16 md:w-16"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </section>
        </article>

        <form className="white-bg dark:dark-bg col-span-1 flex flex-col rounded-lg p-4 md:col-span-7 md:p-6">
          {[
            { label: "Your Name", type: "text", id: "name" },
            { label: "Phone Number", type: "text", id: "phone" },
            { label: "Email", type: "email", id: "email" },
            { label: "Subject", type: "text", id: "subject" },
          ].map(({ label, type, id }) => (
            <div className="mb-4" key={id}>
              <label
                htmlFor={id} // Associate label with input
                className="text-sm font-semibold uppercase text-muted-foreground"
              >
                {label}
              </label>
              <input
                id={id} // ID matches the label's htmlFor
                type={type}
                className="h-12 w-full rounded px-4 outline-none"
              />
            </div>
          ))}
          <div className="mb-4">
            <label
              htmlFor="message" // Associate label with textarea
              className="text-sm font-semibold uppercase text-muted-foreground"
            >
              Your Message
            </label>
            <textarea
              id="message" // ID matches the label's htmlFor
              className="min-h-44 w-full resize-none rounded p-4 outline-none"
            ></textarea>
          </div>
          <Button aria-label="send message" title="send message">
            SEND MESSAGE
          </Button>
        </form>
      </div>
    </div>
  );
}
