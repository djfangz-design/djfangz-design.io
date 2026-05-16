import { z } from "zod";

// Form validation schema
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(20),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  service: z.string().min(1, "Please choose a service"),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Lead storage interface
interface Lead extends ContactFormData {
  id: string;
  timestamp: string;
  method: "whatsapp" | "email" | "offline";
  sent: boolean;
}

const STORAGE_KEY = "nyeneng_leads";
const MAX_LEADS = 100;

/**
 * Check if WhatsApp is available on current device
 */
export function isWhatsAppAvailable(): boolean {
  if (typeof window === "undefined") return true;
  const ua = navigator.userAgent.toLowerCase();
  return /android|iphone|ipod|ipad|whatsapp/.test(ua);
}

/**
 * Check if popup was blocked
 */
export function checkPopupBlocked(popup: Window | null): boolean {
  if (popup === null || popup === undefined) return true;
  try {
    return popup.closed === undefined || popup.closed === true;
  } catch {
    return true;
  }
}

/**
 * Save lead to localStorage
 */
export function saveLead(
  data: ContactFormData,
  method: "whatsapp" | "email" | "offline",
  sent: boolean = false
): Lead {
  if (typeof window === "undefined") throw new Error("Cannot save lead on server");

  const lead: Lead = {
    ...data,
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    method,
    sent,
  };

  try {
    const leads = getLeads();
    leads.unshift(lead);
    if (leads.length > MAX_LEADS) leads.pop();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (error) {
    console.error("Lead storage error:", error);
  }

  return lead;
}

/**
 * Get all stored leads
 */
export function getLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Get lead statistics
 */
export function getLeadStats() {
  const leads = getLeads();
  return {
    total: leads.length,
    sent: leads.filter((l) => l.sent).length,
    unsent: leads.filter((l) => !l.sent).length,
    byMethod: {
      whatsapp: leads.filter((l) => l.method === "whatsapp").length,
      email: leads.filter((l) => l.method === "email").length,
      offline: leads.filter((l) => l.method === "offline").length,
    },
  };
}

/**
 * Export leads as JSON
 */
export function exportJSON(): string {
  return JSON.stringify(getLeads(), null, 2);
}

/**
 * Export leads as CSV
 */
export function exportCSV(): string {
  const leads = getLeads();
  if (leads.length === 0) return "No leads";

  const headers = ["ID", "Name", "Phone", "Email", "Service", "Message", "Timestamp", "Method", "Sent"];
  const rows = leads.map((l) => [
    l.id,
    l.name,
    l.phone,
    l.email || "",
    l.service,
    `"${l.message.replace(/"/g, '""')}"`,
    l.timestamp,
    l.method,
    l.sent ? "Yes" : "No",
  ]);

  return [headers, ...rows].map((row) => row.join(",")).join("\n");
}

/**
 * Download leads as JSON file
 */
export function downloadJSON() {
  const json = exportJSON();
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `nyeneng_leads_${new Date().toISOString().split("T")[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Download leads as CSV file
 */
export function downloadCSV() {
  const csv = exportCSV();
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `nyeneng_leads_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Clear all leads from storage
 */
export function clearLeads() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Clear leads error:", error);
  }
}

/**
 * Send lead via email (placeholder for backend integration)
 */
export async function sendLeadViaEmail(lead: Lead): Promise<{ success: boolean; message: string }> {
  try {
    // Try to send to backend endpoint
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (response.ok) {
      return { success: true, message: "Email sent successfully!" };
    }
    return { success: false, message: "Email service not available" };
  } catch {
    return { success: false, message: "Email service not available" };
  }
}

// Expose utilities to browser console for admin access
if (typeof window !== "undefined") {
  (window as any).__nyeneng = {
    getLeads,
    getLeadStats: getLeadStats,
    stats: getLeadStats,
    exportJSON,
    exportCSV,
    downloadJSON,
    downloadCSV,
    clearLeads,
  };
}
