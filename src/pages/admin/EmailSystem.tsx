import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Send, Users, History } from "lucide-react";
import { toast } from "sonner";

export default function AdminEmailSystem() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [emailType, setEmailType] = useState<"all" | "specific">("all");
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [emailLogs, setEmailLogs] = useState<any[]>([]);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchEmailLogs();
  }, []);

  const fetchUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .order("full_name");
    
    if (data) setUsers(data);
  };

  const fetchEmailLogs = async () => {
    const { data } = await supabase
      .from("email_logs")
      .select("*")
      .order("sent_at", { ascending: false })
      .limit(50);
    
    if (data) setEmailLogs(data);
  };

  const handleSendEmail = async () => {
    if (!subject || !htmlContent) {
      toast.error("Please fill in subject and content");
      return;
    }

    setSending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const recipients = emailType === "all" 
        ? users.map(u => u.id)
        : selectedUsers;

      if (recipients.length === 0) {
        toast.error("Please select at least one recipient");
        return;
      }

      // Log the email
      const { error } = await supabase
        .from("email_logs")
        .insert({
          sent_to: recipients,
          subject,
          sent_by: user.id
        });

      if (error) throw error;

      // In a real implementation, you would call an edge function here
      // to send the actual emails using Resend
      
      toast.success(`Email queued for ${recipients.length} recipient(s)`);
      
      // Reset form
      setSubject("");
      setHtmlContent("");
      setSelectedUsers([]);
      fetchEmailLogs();
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  const defaultTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>VaultBank</h1>
    </div>
    <div class="content">
      <h2>Hello!</h2>
      <p>This is a professional email from VaultBank.</p>
      <p>Your content goes here...</p>
      <a href="#" class="button">Take Action</a>
    </div>
    <div class="footer">
      <p>&copy; 2025 VaultBank. All rights reserved.</p>
      <p>123 Banking Street, Financial District</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Email System</h1>
        <p className="text-slate-300">Send professional emails to your users</p>
      </div>

      <Tabs defaultValue="compose">
        <TabsList className="bg-slate-800/50">
          <TabsTrigger value="compose">
            <Mail className="h-4 w-4 mr-2" />
            Compose Email
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />
            Email History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Compose Professional Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Recipients</Label>
                <Select value={emailType} onValueChange={(v: any) => setEmailType(v)}>
                  <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        All Users ({users.length})
                      </div>
                    </SelectItem>
                    <SelectItem value="specific">Specific Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {emailType === "specific" && (
                <div className="space-y-2">
                  <Label className="text-white">Select Users</Label>
                  <div className="max-h-48 overflow-y-auto border border-slate-600 rounded-lg p-2 bg-slate-900/50">
                    {users.map((user) => (
                      <label key={user.id} className="flex items-center gap-2 p-2 hover:bg-slate-800/50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers([...selectedUsers, user.id]);
                            } else {
                              setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-white text-sm">{user.full_name} - {user.email}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject..."
                  className="bg-slate-900/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="html" className="text-white">HTML Content</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setHtmlContent(defaultTemplate)}
                  >
                    Load Template
                  </Button>
                </div>
                <Textarea
                  id="html"
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  placeholder="Paste your HTML email template here..."
                  className="bg-slate-900/50 border-slate-600 text-white font-mono text-sm"
                  rows={20}
                />
              </div>

              <Button
                onClick={handleSendEmail}
                disabled={sending}
                className="w-full bg-primary"
                size="lg"
              >
                <Send className="h-4 w-4 mr-2" />
                {sending ? "Sending..." : "Send Email"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Email History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emailLogs.map((log) => (
                  <div key={log.id} className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{log.subject}</p>
                        <p className="text-slate-400 text-sm">
                          Sent to {log.sent_to.length} recipient(s)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-300 text-sm">
                          {new Date(log.sent_at).toLocaleString()}
                        </p>
                        <span className="text-xs text-green-400">{log.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
