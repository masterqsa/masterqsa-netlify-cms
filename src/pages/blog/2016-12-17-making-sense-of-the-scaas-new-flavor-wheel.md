---
templateKey: blog-post
title: Assessment Nightmares
date: 2019-01-07T15:04:10.000Z
description: Diary of a QSA
featuredpost: false
featuredimage: /img/about-us_background-title.jpg
tags:
  - PCI-DSS
  - Assessment
  - QSA
  - ISA
---
Here we go again.  When it rains, it pours!  I have just been notified by my boss that another client needs a ROC with a tight deadline.  Ok,  let me add this to the other four assessments I have going...

Assessment number 1 is a standard brick and mortar Level I merchant with 2 payment channels.  Payment channel number 1 is a P2PE solution (not validated - but a NESA is in place) - easy enough.  Payment channel 2 is ecommerce application hosted on a popular cloud provider with an iframe payment page from a well known payment processor.  

Assessment number 2 is a much more complicated situation.  It is a Level I collection agency that has call centers in 20 states, each with enough differentiation I can not perform sampling.  To make this worse, they use VOIP for calls on a flat network with no call encryption technology.  

Assessment number 3 is a well known restaurant chain with 2 payment channels.  Payment channel 1 centers around the use of wireless "kiosk" devices at every table and payment channel 2 is a unencrypted swipe device or manual entry at a POS station.

Assessment number 4 is a giant internet retailer who host everything themselves and has written their own software.  It is a single payment channel, but it will be quite a lot of work to untangle the flow of payment card data.

The common element of all these assessments is the clock is ticking.  Their acquirers are expecting compliant ROCs by a fixed date.  Yes, sometimes you can ask for and get extensions, but is this good business if it is no fault of your client?

Now on to the nightmare...

The QSA company I work for has limited processes in place to perform these assessments.  Sadly, they have no efficient tooling for managing the myriad of things that must occur for each of these assessments to be conducted in an accurate and timely manner.  We rely on email for client communications.  During a typical day of any assessment I find myself looking at well over 100 of these emails and the back and forth of having my clients deliver the right evidence I need to close a control.  Managing projects this way is simply kicking my you know what...

It gets better!  Keeping up with the evidence, relating each artifact or artifacts to a specific testing procedure and multiplying ALL of this by 4?  I am getting a migraine just typing this!

In addition to all of this (which is really only a small part of dealing with these assessments), the projects with multiple payment channels likely require a different response on each testing procedure for each channel for the report to be truly accurate.  I use spreadsheets to track this, but I am sure I have inadvertently let a report go that might have missed something some where.  I am confident it happens almost every time on complicated - multi-payment channel assessments.

Keeping my customers happy and engaged is my top priority, but to them it always looks like I am out of breath keeping track of their project and little do they know I have 3 or more others going at the same time!

So...  here is a happy ending to consider!

MasterQSA allows me to do everything I need to efficiently manage, track, interview, collect evidence, QA, seek consensus guidance from other team members, and a WHOLE LOT MORE.  The best part?  It keeps up with ALL payment channels for EACH testing procedure so I am sure, after I click "Audit Assessment" that the report misses nothing.  It handles my calendar, and makes sure the proper stakeholders are present in my meetings.  It allows my boss, project managers, and QA personnel full visibility into what is happening.  It creates FULL accountability for me and my clients!  It makes it WAY easier to ask for an SOW addendum if I can print a heat map showing how much time me (the QSA) and the client has been engaged on particular testing procedures.  Is all of that really the best part?  Nope... clicking "Print Report" and watching the PERFECT Report on Compliance appear on my screen ready to be signed, sealed and delivered!
