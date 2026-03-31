import { ChangeEvent, FormEvent, useState } from "react";
import { Upload, ChevronDown, X } from "lucide-react";
import { Link } from "wouter";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

const howItWorks = [
  {
    title: "Tell us the role",
    copy: "Upload a JD, paste it, or describe the role in plain language."
  },
  {
    title: "We screen candidates",
    copy: "Our consultants match requirements against pre-qualified talent."
  },
  {
    title: "You get a shortlist",
    copy: "Expect a curated shortlist within 1–2 business days."
  }
];

const hiringTypes = ["Internship", "Part-time", "Full-time", "Contract"];
const functions = ["Data", "Engineering", "Marketing", "Finance", "Operations", "People", "Design"];

const optionalFields = [
  { id: "weeklyHours", label: "Weekly hours", placeholder: "e.g. 20 per week" },
  { id: "workRights", label: "Work rights", placeholder: "e.g. Full work rights required" },
  { id: "budgetRange", label: "Budget range", placeholder: "e.g. $30–35/hr internship stipend" },
  { id: "preferredUniversity", label: "Preferred universities", placeholder: "Optional" },
  { id: "mustHaveSkills", label: "Must-have skills", placeholder: "e.g. SQL, Tableau, stakeholder comms" }
];

export default function JDGeneration() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [showOptional, setShowOptional] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFileName(file ? file.name : null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-secondary/10 text-primary">
      <Navbar />
      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] items-start">
            <section className="space-y-8 lg:sticky lg:top-24">
              <div className="inline-flex items-center rounded-full bg-secondary/40 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.4em]">
                JD Submission
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-serif leading-tight text-primary">
                  Drop your JD. We'll handle the shortlist.
                </h1>
                <p className="text-lg text-gray-600">
                  No JD? No problem — just describe what you need in plain language. We take care of the rest.
                </p>
              </div>
              <Card className="rounded-3xl border-primary/10 bg-white/80 p-6 shadow-sm">
                <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-6">How it works</p>
                <ol className="space-y-6">
                  {howItWorks.map((item, index) => (
                    <li key={item.title} className="flex gap-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-primary">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.copy}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Card>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                We only use your details to coordinate matching.
              </div>
            </section>

            <section>
              <Card className="rounded-[2.5rem] border-secondary/60 bg-white/90 p-8 shadow-lg shadow-primary/5">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-primary">Step 1 — Who's hiring</p>
                      <p className="text-sm text-gray-500">Tell us where to send the shortlist.</p>
                    </div>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company name*</Label>
                        <Input id="companyName" name="companyName" placeholder="e.g. Acme Labs" className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Your name*</Label>
                        <Input id="contactName" name="contactName" placeholder="e.g. Jane Smith" className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Work email*</Label>
                        <Input id="email" name="email" type="email" placeholder="jane@company.com" className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
                        <p className="text-xs text-gray-500">We'll send your shortlist here</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-primary">Step 2 — The role</p>
                      <p className="text-sm text-gray-500">Give us the role snapshot.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="roleTitle">Role title*</Label>
                        <Input id="roleTitle" name="roleTitle" placeholder="e.g. Data Analyst Intern" className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Hiring type*</Label>
                          <Select defaultValue={hiringTypes[0]}>
                            <SelectTrigger className="h-12 rounded-2xl border-gray-200 bg-gray-50">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {hiringTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Function*</Label>
                          <Select defaultValue={functions[0]}>
                            <SelectTrigger className="h-12 rounded-2xl border-gray-200 bg-gray-50">
                              <SelectValue placeholder="Select function" />
                            </SelectTrigger>
                            <SelectContent>
                              {functions.map((fn) => (
                                <SelectItem key={fn} value={fn}>
                                  {fn}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location*</Label>
                          <Input id="location" name="location" placeholder="e.g. Sydney / Remote" className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="startDate">Start date</Label>
                            <Input id="startDate" name="startDate" type="date" className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="numberOfHires">Number of hires</Label>
                            <Input id="numberOfHires" name="numberOfHires" type="number" min={1} className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4 rounded-3xl border border-dashed border-gray-200 bg-secondary/10 p-6 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                        <Upload className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary">Upload a file</p>
                        <p className="text-sm text-gray-500">PDF or Word doc</p>
                      </div>
                      <Button type="button" className="mx-auto rounded-full px-6" onClick={() => document.getElementById("jdUpload")?.click()}>
                        Choose file
                      </Button>
                      <input id="jdUpload" name="jdUpload" type="file" className="hidden" onChange={handleFileChange} />
                      <p className="text-xs text-gray-500" aria-live="polite">
                        {fileName ? `Selected: ${fileName}` : "No file selected"}
                      </p>
                    </div>
                    <div className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">or</div>
                    <div className="space-y-2">
                      <Label htmlFor="jdNotes">Paste JD or describe the role*</Label>
                      <Textarea
                        id="jdNotes"
                        name="jdNotes"
                        rows={4}
                        placeholder="e.g. We need a data intern 3 days/week..."
                        className="rounded-3xl border-gray-200 bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idealCandidate">What matters most in a candidate?</Label>
                      <Textarea
                        id="idealCandidate"
                        name="idealCandidate"
                        rows={3}
                        placeholder="e.g. Keen to learn, strong attention to detail, interview slots Tue/Thu mornings."
                        className="rounded-3xl border-gray-200 bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-primary"
                      onClick={() => setShowOptional((prev) => !prev)}
                    >
                      <span>+ Add optional details for a more targeted shortlist</span>
                      <ChevronDown className={cn("h-5 w-5 transition", showOptional ? "rotate-180" : "rotate-0")} />
                    </button>
                    {showOptional && (
                      <div className="space-y-4 rounded-3xl border border-primary/10 bg-secondary/20 p-6">
                        {optionalFields.map((field) => (
                          <div key={field.id} className="space-y-2">
                            <Label htmlFor={field.id}>{field.label}</Label>
                            <Input
                              id={field.id}
                              name={field.id}
                              placeholder={field.placeholder}
                              className="h-12 rounded-2xl border-gray-200 bg-white"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Button type="submit" className="w-full rounded-full py-6 text-base font-semibold">
                      Start matching
                    </Button>
                    <p className="text-center text-sm text-gray-500">We'll send your shortlist within 1–2 business days</p>
                  </div>
                </form>
                <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                  <DialogContent hideCloseButton className="rounded-[2rem] border-none bg-white/95 p-10 text-center">
                    <DialogClose className="absolute right-6 top-6 rounded-full bg-primary/10 p-2 text-primary transition hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/40">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Stay on page</span>
                    </DialogClose>
                    <DialogHeader className="space-y-4">
                      <DialogTitle className="text-2xl font-serif text-primary">
                        Thank you! Our team will reach out to you within 24 hours!
                      </DialogTitle>
                      <DialogDescription className="text-sm text-gray-600">
                        Learn more about us here.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-6">
                      <Link href="/founders-network">
                        <Button className="w-full rounded-full px-10 bg-primary text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl">
                          Explore our programs
                        </Button>
                      </Link>
                    </div>
                  </DialogContent>
                </Dialog>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
