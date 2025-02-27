import { Metadata } from "next";
import "./globals.css";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Coramin AI Saving App",
  description: "AI Saving App",
};

// Load API Key from .env file
const copilotApiKey = process.env.NEXT_PUBLIC_COPILOTKIT_API_KEY;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider >
    <html lang="en">
      <body className={``}>
        {copilotApiKey ? (
          <CopilotKit publicApiKey={copilotApiKey}>{children}</CopilotKit>
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
    </ClerkProvider>
  );
}
