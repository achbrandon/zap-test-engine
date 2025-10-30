import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, X } from "lucide-react";

interface SupportChatProps {
  userId?: string;
  onClose: () => void;
}

export function SupportChat({ userId, onClose }: SupportChatProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userId) {
      loadOrCreateTicket();
    }
  }, [userId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadOrCreateTicket = async () => {
    try {
      // Try to find an open ticket
      const { data: existingTickets, error: fetchError } = await supabase
        .from("support_tickets")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "open")
        .order("created_at", { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      if (existingTickets && existingTickets.length > 0) {
        setTicketId(existingTickets[0].id);
        loadMessages(existingTickets[0].id);
      } else {
        // Create new ticket
        const { data: newTicket, error: createError } = await supabase
          .from("support_tickets")
          .insert({
            user_id: userId,
            ticket_type: "inquiry",
            subject: "General Support",
            description: "Chat support session",
            status: "open"
          })
          .select()
          .single();

        if (createError) throw createError;
        setTicketId(newTicket.id);

        // Add welcome message
        setMessages([{
          id: "welcome",
          sender_id: "system",
          message: "Hello! How can we help you today?",
          is_staff: true,
          created_at: new Date().toISOString()
        }]);
      }
    } catch (error: any) {
      console.error("Error loading ticket:", error);
      toast.error("Failed to start chat session");
    }
  };

  const loadMessages = async (ticketId: string) => {
    try {
      const { data, error } = await supabase
        .from("support_messages")
        .select("*")
        .eq("ticket_id", ticketId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      console.error("Error loading messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !ticketId || !userId) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from("support_messages")
        .insert({
          ticket_id: ticketId,
          sender_id: userId,
          message: newMessage.trim(),
          is_staff: false
        });

      if (error) throw error;

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender_id: userId,
        message: newMessage.trim(),
        is_staff: false,
        created_at: new Date().toISOString()
      }]);

      setNewMessage("");

      // Simulate support response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          sender_id: "staff",
          message: "Thank you for your message. A support agent will respond shortly. For immediate assistance, please call 1-800-VAULT-BANK.",
          is_staff: true,
          created_at: new Date().toISOString()
        }]);
      }, 1000);

    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg h-[600px] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle>Support Chat</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.is_staff ? "" : "flex-row-reverse"}`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={message.is_staff ? "bg-primary text-primary-foreground" : "bg-muted"}>
                    {message.is_staff ? "VB" : "You"}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 ${message.is_staff ? "" : "text-right"}`}>
                  <div
                    className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                      message.is_staff
                        ? "bg-muted text-left"
                        : "bg-primary text-primary-foreground text-right"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(message.created_at).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" size="icon" disabled={loading || !newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
