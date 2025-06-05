const challenges = [
  {
    id: 1,
    level: "Newbie",
    type: "sms",
    sender: "+63-912-555-6789",
    realSender: "+63-912-555-6789",
    subject: "GCash: Account Locked",
    date: "Thu, 5 Jun 2025 10:00 AM",
    body: 'Dear Customer, Your GCash acount has been locked due to uns activity. Verify now at <a href="https://gcash-login.example.com/verify" data-tooltip="https://gcash-login.example.com/verify"><span class="tooltip">https://gcash-login.example.com</span></a> or loose your account. Enter OTP sent.',
    redFlags: ["Unknown phone number", "Suspicious URL", "Urgent language", "Generic greeting", "Spelling errors"],
    hints: [
      "Legitimate GCash messages come from verified numbers like 2882",
      "Check URLs for non-gcash.com domains",
      "Never share OTPs via links",
      "Look for generic greetings like 'Dear Customer'",
      "Spelling errors like 'acount' are common in phishing"
    ]
  },
  {
    id: 2,
    level: "Newbie",
    type: "sms",
    sender: "2882",
    realSender: "2882",
    subject: "GCash: Balance Update",
    date: "Thu, 5 Jun 2025 09:55 AM",
    body: 'Hi Juan Dela Cruz, your GCash balance is ₱5,000 as of 5 Jun 2025. For details, log in to the GCash app.',
    redFlags: [],
    hints: [
      "Legitimate GCash SMS comes from 2882",
      "No links or urgent requests",
      "Personalized greeting with your name",
      "Directs to official app, not a website"
    ]
  },
  {
    id: 3,
    level: "Beginner",
    type: "email",
    sender: "no-reply@shopee.ph",
    realSender: "spoof@shopee-promo.example.co",
    subject: "Congratulations! You’ve Won a Shopee Raffle Prize",
    to: "user@example.com",
    date: "Thu, 5 Jun 2025 09:45 AM",
    body: `
      <img src="assets/shopee.png" alt="Shopee Logo" class="email-logo" onerror="this.src='https://via.placeholder.com/150x50?text=Shopee+Logo'" />
      <p>Dear Valued Customer,</p>
      <p>Congrats! You’re a winner in our Shopee Anniversary Raffle. You’ve won a ₱10,000 shopping voucher.</p>
      <p>Click below to verify within 24 hours:</p>
      <p><a href="#" data-tooltip="https://shopee-promo.example.co/claim"><span class="tooltip">Claim Your Prize</span></a></p>
      <p>Attached is a PDF with details. Hurry, offer expires soon!</p>
      <p>Best,<br>The Shopee Team</p>
      <div class="email-footer">
        <p>Shopee Philippines | 5F BGC Corporate Center, Taguig</p>
        <p><a href="#">Contact Us</a> | <a href="#">Privacy Policy</a> | <a href="#">Unsubscribe</a></p>
        <p>© 2025 Shopee</p>
      </div>
    `,
    redFlags: ["Spoofed sender email", "Suspicious URL", "Unsolicited prize", "Generic greeting", "Suspicious attachment"],
    hints: [
      "Verify sender email matches shopee.com.ph",
      "Check link domain against shopee.com.ph",
      "Shopee rewards are in-app",
      "Avoid generic greetings",
      "Don’t open unsolicited attachments"
    ]
  },
  {
    id: 4,
    level: "Beginner",
    type: "email",
    sender: "order@shopee.com.ph",
    realSender: "order@shopee.com.ph",
    subject: "Order Confirmation #123456789",
    to: "user@example.com",
    date: "Thu, 5 Jun 2025 09:40 AM",
    body: `
      <img src="assets/shopee.png" alt="Shopee Logo" class="email-logo" onerror="this.src='https://via.placeholder.com/150x50?text=Shopee+Logo'" />
      <p>Dear Juan Dela Cruz,</p>
      <p>Thank you for your order #123456789 placed on 5 Jun 2025. Your items will be shipped within 2 days.</p>
      <p>Order Details:</p>
      <ul>
        <li>Item: Wireless Earbuds</li>
        <li>Price: ₱999</li>
        <li>Estimated Delivery: 7 Jun 2025</li>
      </ul>
      <p>Track your order in the Shopee app or at <a href="https://shopee.com.ph/track">shopee.com.ph/track</a>.</p>
      <p>Happy Shopping!<br>The Shopee Team</p>
      <div class="email-footer">
        <p>Shopee Philippines | 5F BGC Corporate Center, Taguig</p>
        <p><a href="#">Contact Us</a> | <a href="#">Privacy Policy</a> | <a href="#">Unsubscribe</a></p>
        <p>© 2025 Shopee</p>
      </div>
    `,
    redFlags: [],
    hints: [
      "Legitimate Shopee emails come from shopee.com.ph",
      "Links point to official domains",
      "Personalized with your name and order details",
      "No urgent requests or attachments"
    ]
  },
  {
    id: 5,
    level: "Intermediate",
    type: "sms",
    sender: "+63-917-123-4567",
    realSender: "+63-917-123-4567",
    subject: "Globe: Payment Overdue",
    date: "Thu, 5 Jun 2025 09:30 AM",
    body: 'Urgent: Your Globe bill is overdue. Pay now at <a href="https://globe-pay.example.com" data-tooltip="https://globe-pay.example.com"><span class="tooltip">globe-pay.example.com</span></a> to avoid disconnection.',
    redFlags: ["Unknown phone number", "Suspicious URL", "Urgent language", "No personalization"],
    hints: [
      "Globe SMS comes from official numbers or 'Globe'",
      "Check URLs for globe.com.ph",
      "Legitimate bills include account details",
      "Avoid urgent payment links"
    ]
  },
  {
    id: 6,
    level: "Intermediate",
    type: "email",
    sender: "support@lazada.com.ph",
    realSender: "support@lazada-promo.example.com",
    subject: "Lazada: Account Verification Required",
    to: "user@example.com",
    date: "Thu, 5 Jun 2025 09:25 AM",
    body: `
      <img src="assets/lazada.png" alt="Lazada Logo" class="email-logo" onerror="this.src='https://via.placeholder.com/150x50?text=Lazada+Logo'" />
      <p>Dear Customer,</p>
      <p>Your Lazada account need verification due to recent login attempts. Please verify now:</p>
      <p><a href="#" data-tooltip="https://lazada-verify.example.com"><span class="tooltip">Verify Account</span></a></p>
      <p>Failure to verify within 48 hours may lock your account.</p>
      <p>Regards,<br>Lazada Support Team</p>
      <div class="email-footer">
        <p>Lazada Philippines | Pasig City</p>
        <p><a href="#">Help Center</a> | <a href="#">Privacy Policy</a> | <a href="#">Unsubscribe</a></p>
        <p>© 2025 Lazada</p>
      </div>
    `,
    redFlags: ["Spoofed sender email", "Suspicious URL", "Urgent language", "Generic greeting", "Grammar errors"],
    hints: [
      "Verify sender email matches lazada.com.ph",
      "Check link domain",
      "Lazada verification is in-app",
      "Avoid generic greetings",
      "Look for errors like 'need verification'"
    ]
  },
  {
    id: 7,
    level: "Advanced",
    type: "sms",
    sender: "GrabPH",
    realSender: "+63-905-987-6543",
    subject: "Grab: Account Security Alert",
    date: "Thu, 5 Jun 2025 09:20 AM",
    body: 'Your Grab account has suspicious activity. Secure it now at <a href="https://grab-security.example.com" data-tooltip="https://grab-security.example.com"><span class="tooltip">grab-security.example.com</span></a>. Reply STOP to unsubscribe.',
    redFlags: ["Spoofed sender name", "Suspicious URL", "Urgent language", "Unusual phone number"],
    hints: [
      "Grab SMS comes from official numbers or 'Grab'",
      "Check URLs for grab.com",
      "Legitimate alerts don’t use generic links",
      "Verify sender number"
    ]
  },
  {
    id: 8,
    level: "Advanced",
    type: "email",
    sender: "security@bdo.com.ph",
    realSender: "security@bdo-alert.example.com",
    subject: "Urgent: Suspicious Activity on Your BDO Account",
    to: "user@example.com",
    date: "Thu, 5 Jun 2025 09:15 AM",
    body: `
      <img src="assets/bdo.png" alt="BDO Logo" class="email-logo" onerror="this.src='https://via.placeholder.com/150x50?text=BDO+Logo'" />
      <p>Dear Valued Client,</p>
      <p>We detected unusual activity on your BDO Unibank account. Immediate action is required.</p>
      <p>Review the attached Security Alert PDF for details. Verify your identity here:</p>
      <p><a href="#" data-tooltip="https://bdo-security.example.com/verify"><span class="tooltip">Secure Your Account</span></a></p>
      <p>Failure to comply within 24 hours may suspend your account.</p>
      <p>Sincerely,<br>BDO Security Team</p>
      <div class="email-footer">
        <p>BDO Unibank, Inc. | Makati City</p>
        <p><a href="#">Support</a> | <a href="#">Privacy</a> | <a href="#">Unsubscribe</a></p>
        <p>© 2025 BDO</p>
      </div>
    `,
    redFlags: ["Spoofed sender email", "Suspicious attachment", "Suspicious URL", "Urgent language", "Generic greeting"],
    hints: [
      "Verify sender email matches bdo.com.ph",
      "BDO doesn’t send unsolicited attachments",
      "Check URLs against bdo.com.ph",
      "Avoid urgent requests",
      "Look for generic greetings"
    ]
  },
  {
    id: 9,
    level: "Insane",
    type: "sms",
    sender: "Metrobank",
    realSender: "+63-998-765-4321",
    subject: "Metrobank: OTP Verification",
    date: "Thu, 5 Jun 2025 09:10 AM",
    body: 'Your Metrobank OTP is 123456. Verify transaction at <a href="https://metrobank-otp.example.com" data-tooltip="https://metrobank-otp.example.com"><span class="tooltip">metrobank-otp.example.com</span></a>. Do not share OTP.',
    redFlags: ["Spoofed sender name", "Unsolicited OTP", "Suspicious URL", "Unusual phone number"],
    hints: [
      "Metrobank SMS comes from official numbers",
      "Legitimate OTPs are requested by you",
      "Check URLs for metrobank.com.ph",
      "Verify sender number"
    ]
  },
  {
    id: 10,
    level: "Insane",
    type: "email",
    sender: "account@paypal.com",
    realSender: "account@paypal-security.example.com",
    subject: "Action Required: Verify Your PayPal Account",
    to: "user@example.com",
    date: "Thu, 5 Jun 2025 09:05 AM",
    body: `
      <img src="assets/paypal.png" alt="PayPal Logo" class="email-logo" onerror="this.src='https://via.placeholder.com/150x50?text=PayPal+Logo'" />
      <p>Dear PayPal User,</p>
      <p>Unusual activity detected on your PayPal account. Verify your identity now:</p>
      <p><a href="#" data-tooltip="https://paypal.com.security-verify.example.com"><span class="tooltip">Verify Account</span></a></p>
      <p>Attached is a Verification Form PDF. Verify within 24 hours or risk suspension.</p>
      <p>Thanks,<br>PayPal Security Team</p>
      <div class="email-footer">
        <p>PayPal, Inc. | San Jose, CA</p>
        <p><a href="#">Help</a> | <a href="#">Privacy</a> | <a href="#">Unsubscribe</a></p>
        <p>© 2025 PayPal</p>
      </div>
    `,
    redFlags: ["Spoofed sender email", "Subdomain URL masking", "Suspicious attachment", "Urgent language", "Generic greeting"],
    hints: [
      "Verify sender email matches paypal.com",
      "Check for non-paypal.com domains",
      "PayPal doesn’t send unsolicited attachments",
      "Avoid urgent verification links",
      "Look for generic greetings"
    ]
  }
];
