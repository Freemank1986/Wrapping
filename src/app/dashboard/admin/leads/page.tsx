import { requireAdmin } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = { title: "Leads — Wrapt Admin" };

export default async function AdminLeadsPage() {
  await requireAdmin();

  const [workshopLeads, partnerLeads] = await Promise.all([
    prisma.workshopLead.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.partnerLead.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <Tabs defaultValue="workshops">
      <TabsList>
        <TabsTrigger value="workshops">Workshop leads ({workshopLeads.length})</TabsTrigger>
        <TabsTrigger value="partners">Partner leads ({partnerLeads.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="workshops">
        <div className="rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Group size</TableHead>
                <TableHead>Preferred date</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Received</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workshopLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell className="text-sm">
                    {lead.email}
                    {lead.phone && <p className="text-xs text-muted-foreground">{lead.phone}</p>}
                  </TableCell>
                  <TableCell>{lead.groupSize ?? "—"}</TableCell>
                  <TableCell>
                    {lead.preferredDate
                      ? lead.preferredDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                    {lead.message ?? "—"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {lead.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
              {workshopLeads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    No workshop leads yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="partners">
        <div className="rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Received</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partnerLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.businessName}</TableCell>
                  <TableCell className="text-sm">
                    {lead.contactName}
                    <p className="text-xs text-muted-foreground">{lead.email}</p>
                    {lead.phone && <p className="text-xs text-muted-foreground">{lead.phone}</p>}
                  </TableCell>
                  <TableCell>{lead.businessType}</TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                    {lead.message ?? "—"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {lead.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
              {partnerLeads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                    No partner leads yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
}
