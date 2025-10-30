import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Circle } from "lucide-react";
import { toast } from "sonner";

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTickets();

    // Subscribe to realtime updates
    const ticketsChannel = supabase
      .channel('admin-support-tickets')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'support_tickets' }, () => {
        fetchTickets();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(ticketsChannel);
    };
  }, []);

  useEffect(() => {
    if (selectedTicket) {
      fetchMessages(selectedTicket.id);
      subscribeToMessages(selectedTicket.id);
      markTicketAsRead(selectedTicket.id);
    }
  }, [selectedTicket]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from("support_tickets")
        .select("*, profiles(full_name, email)")
        .eq("status", "open")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (ticketId: string) => {
    try {
      const { data, error } = await supabase
        .from("support_messages")
        .select("*")
        .eq("ticket_id", ticketId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);

      // Mark messages as read
      await supabase
        .from("support_messages")
        .update({ is_read: true })
        .eq("ticket_id", ticketId)
        .eq("is_staff", false);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const subscribeToMessages = (ticketId: string) => {
    const channel = supabase
      .channel(`messages-${ticketId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'support_messages',
        filter: `ticket_id=eq.${ticketId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
        if (!payload.new.is_staff) {
          markMessageAsRead(payload.new.id);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const markTicketAsRead = async (ticketId: string) => {
    await supabase
      .from("support_tickets")
      .update({ agent_online: true })
      .eq("id", ticketId);
  };

  const markMessageAsRead = async (messageId: string) => {
    await supabase
      .from("support_messages")
      .update({ is_read: true })
      .eq("id", messageId);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedTicket) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("support_messages")
        .insert({
          ticket_id: selectedTicket.id,
          sender_id: user.id,
          message: newMessage.trim(),
          is_staff: true
        });

      if (error) throw error;

      await supabase
        .from("support_tickets")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", selectedTicket.id);

      setNewMessage("");
      toast.success("Message sent");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const getUnreadCount = (ticketId: string) => {
    // Would need to query unread messages
    return 0;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Support Center</h1>
        <p className="text-slate-300">Manage customer support tickets and chat in real-time</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Tickets List */}
        <Card className="col-span-4 bg-slate-800/50 border-slate-700 flex flex-col">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Open Tickets ({tickets.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full">
              <div className="space-y-2 p-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedTicket?.id === ticket.id
                        ? "bg-primary/20 border-primary"
                        : "bg-slate-900/50 border-slate-700 hover:bg-slate-900/70"
                    } border`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/20 text-primary text-sm">
                            {ticket.profiles?.full_name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium text-sm">
                            {ticket.profiles?.full_name}
                          </p>
                          <p className="text-slate-400 text-xs">
                            {ticket.profiles?.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {ticket.user_online && (
                          <Circle className="h-3 w-3 fill-green-500 text-green-500" />
                        )}
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm line-clamp-2">
                      {ticket.subject}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {ticket.ticket_type}
                      </Badge>
                      <span className="text-xs text-slate-400">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="col-span-8 bg-slate-800/50 border-slate-700 flex flex-col">
          {selectedTicket ? (
            <>
              <CardHeader className="border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {selectedTicket.profiles?.full_name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-white text-lg">
                        {selectedTicket.profiles?.full_name}
                      </CardTitle>
                      <p className="text-slate-400 text-sm flex items-center gap-2">
                        {selectedTicket.user_online ? (
                          <>
                            <Circle className="h-2 w-2 fill-green-500 text-green-500" />
                            Online
                          </>
                        ) : (
                          <>
                            <Circle className="h-2 w-2 fill-slate-500 text-slate-500" />
                            Offline
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{selectedTicket.ticket_type}</Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-hidden p-4">
                <ScrollArea className="h-full" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.is_staff ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.is_staff
                              ? "bg-primary text-primary-foreground"
                              : "bg-slate-700 text-white"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs opacity-70">
                              {new Date(message.created_at).toLocaleTimeString()}
                            </span>
                            {message.is_staff && message.is_read && (
                              <span className="text-xs opacity-70">• Read</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              <div className="p-4 border-t border-slate-700">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                    className="bg-slate-900/50 border-slate-600 text-white"
                  />
                  <Button onClick={sendMessage} className="bg-primary">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a ticket to view conversation</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
