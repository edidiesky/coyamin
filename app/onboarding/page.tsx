"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bot, User, Sparkles } from "lucide-react"

interface Message {
  type: "bot" | "user"
  content: string
  options?: string[]
}

export default function OnboardingChat() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: "Welcome to Coyamin! I'm your AI Investment & Savings Copilot. Let's set up your financial profile. What are your main financial goals?",
      options: [
        "Short-term savings (1-2 years)",
        "Long-term investments (5+ years)",
        "Retirement planning",
        "Emergency fund",
        "Wealth building",
      ],
    },
  ])
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string[]>>({})

  const steps = [
    { title: "Financial Goals", progress: 33 },
    { title: "Risk Tolerance", progress: 66 },
    { title: "Investment Preferences", progress: 100 },
  ]

  const handleOptionSelect = (option: string) => {
    setMessages((prev) => [...prev, { type: "user", content: option }])

    setSelectedOptions((prev) => ({
      ...prev,
      [currentStep]: [...(prev[currentStep] || []), option],
    }))

    setTimeout(() => {
      if (currentStep === 0) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: "Great choice! Now, what's your risk tolerance level?",
            options: ["Conservative (Low Risk)", "Moderate (Medium Risk)", "Aggressive (High Risk)"],
          },
        ])
        setCurrentStep(1)
      } else if (currentStep === 1) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: "Perfect! Finally, which investment types interest you? (You can select multiple)",
            options: ["Stocks", "ETFs", "Bonds", "Crypto", "Real Estate", "Mutual Funds"],
          },
        ])
        setCurrentStep(2)
      } else if (currentStep === 2) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: "Thanks! I'll now create your personalized investment profile based on your preferences.",
          },
        ])
        setTimeout(() => {
          router.push("/dashboard") // Redirect to dashboard
        }, 1500)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between shadow-md">
        <h1 className="text-lg font-semibold">Coyamin Onboarding</h1>
        <Sparkles size={24} />
      </header>

      <div className="max-w-3xl mx-auto p-4">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="ml-2 text-sm hidden sm:inline">{step.title}</span>
                {index < steps.length - 1 && <ArrowRight className="mx-2 text-gray-400" size={20} />}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${steps[currentStep].progress}%` }}
            />
          </div>
        </div>

        {/* Chat Interface */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="h-[600px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex items-start max-w-[80%] ${
                        message.type === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === "user" ? "bg-blue-600 ml-2" : "bg-gray-200 mr-2"
                        }`}
                      >
                        {message.type === "user" ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-4 ${
                          message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Options */}
              {messages[messages.length - 1]?.options && (
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex flex-wrap gap-2">
                    {messages[messages.length - 1]?.options?.map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        className="bg-white hover:bg-blue-50"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Selected Preferences */}
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.values(selectedOptions)
            .flat()
            .map((option, index) => (
              <Badge key={index} variant="secondary">
                {option}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  )
}