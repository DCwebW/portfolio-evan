import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const { nom, prenom, email, objet, message } = await req.json()

  if (!nom || !prenom || !email || !objet || !message) {
    return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APPLICATION_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Portfolio Evan" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Contact Portfolio] ${objet}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="color: #e63946; margin-bottom: 4px;">Nouveau message via le portfolio</h2>
          <hr style="border: none; border-top: 1px solid #eee; margin-bottom: 24px;" />
          <p><strong>De :</strong> ${prenom} ${nom}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Objet :</strong> ${objet}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return NextResponse.json({ error: "Échec de l'envoi. Réessayez plus tard." }, { status: 500 })
  }
}
