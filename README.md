# weddingSite
Wedding website for Michael Schmidgall and Melissa Nelson

#Please set up a .env file with following criteria to make work:
MONGODB_URI = xxxxxxxxxx
  connection to mongodb and mlab
GMAIL_EMAIL = xxxxxxxxxx
  if gmail, use port = 465 and secure = true / else config port to email provider and secure = false
  also set tls: { rejectUnauthorized: false } if working on localhost
GMAIL_PASS = xxxxxxxxxx
  this is your email account password
GMAIL_RECEIVER = xxxxxxxxxx
  mail:to account
