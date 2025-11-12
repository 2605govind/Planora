
Supabase Edge Functions se direct SMTP karna abhi possible nahi hai (Edge runtime me SMTP ports block hote hain).


HTTP email API (Resend / SendGrid / Mailgun) — Edge Function se direct hit. (recommended)

Supabase Edge Functions me SMTP ports 25 & 587 blocked
Agar tumhara SMTP provider port 2525 allow karta ho, to try kar sakte ho