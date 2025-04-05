interface WelcomeEmailProps {
  firstName: string
  hasNewsletter: boolean
  socialLinks: {
    facebook?: string
    youtube?: string
    whatsapp?: string
    instagram?: string
  }
}

const logoUrl =
  'https://res.cloudinary.com/kelibst/image/upload/v1738902873/clearresult/kzbahxlltoco63jwbh23.jpg'

export const welcomeEmailHTML = ({ firstName, hasNewsletter, socialLinks }: WelcomeEmailProps) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333333;
      }
      .header {
        background-color: #f8f9fa;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 20px;
      }
      .footer {
        background-color: #f8f9fa;
        padding: 20px;
        text-align: center;
      }
      .social-links {
        margin: 20px 0;
      }
      .social-links a {
        margin: 0 10px;
        color: #0066cc;
        text-decoration: none;
      }
      .highlight {
        background-color: #fff3cd;
        padding: 10px;
        border-radius: 5px;
        margin: 15px 0;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img src="https://res.cloudinary.com/kelibst/image/upload/v1738902873/clearresult/kzbahxlltoco63jwbh23.jpg" alt="Company Logo" style="max-width: 200px;">
      </div>
      
      <div class="content">
        <h2>Welcome to Our Community, ${firstName}!</h2>
        
        <p>We're thrilled to have you join us and want to thank you for creating an account.</p>
        
        ${
          hasNewsletter
            ? `<div class="highlight">
                <p>🎉 Thank you for subscribing to our newsletter! You'll be among the first to receive updates about our latest news, features, and special offers.</p>
              </div>`
            : ''
        }
        
        <h3>Your Data Security</h3>
        <p>We take your privacy seriously. Rest assured that your personal information is encrypted and securely stored according to the highest industry standards.</p>
        
        <h3>Join Our Social Community</h3>
        <p>Connect with us on social media to stay updated and join our growing community:</p>
        
        <div class="social-links">
          ${socialLinks.facebook ? `<a href="${socialLinks.facebook}">Facebook</a>` : ''}
          ${socialLinks.youtube ? `<a href="${socialLinks.youtube}">youtube</a>` : ''}
          ${socialLinks.whatsapp ? `<a href="${socialLinks.whatsapp}">whatsapp</a>` : ''}
          ${socialLinks.instagram ? `<a href="${socialLinks.instagram}">Instagram</a>` : ''}
        </div>
        
        <p>If you have any questions or need assistance, our support team is here to help. Just reply to this email!</p>
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} ClearResult Consult All rights reserved.</p>
       <a href="tel:+2330502721866">-2330502721866</a>
      </div>
    </div>
  </body>
</html>
`
