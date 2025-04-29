import { motion } from "framer-motion";
import Link from "next/link";

import { MessageIcon } from "./icons";
import { LogoPython } from "@/app/icons";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center font-bold text-2xl">
          Interview Taylor Swift
        </p>
        <p>
          Welcome to the Taylor Swift Interview Simulator. Ask Taylor questions about her
          music, career, Reputation era, or anything else you'd like to know.
        </p>
        <p>
          This interview simulator imagines you're speaking with Taylor in 2017, during
          her Reputation era. Try asking thoughtful questions that might reveal her creative
          process, experiences, or perspectives from that time.
        </p>
        <p className="text-sm text-muted-foreground">
          Built with {" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://github.com/vercel-labs/ai-sdk-preview-python-streaming"
            target="_blank"
          >
            Vercel AI SDK
          </Link> and {" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://nextjs.org"
            target="_blank"
          >
            Next.js
          </Link>
        </p>
      </div>
    </motion.div>
  );
};
