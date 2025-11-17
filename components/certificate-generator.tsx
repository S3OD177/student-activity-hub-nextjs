"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Award, Share2, Facebook, Twitter, MessageCircle, Send, Link as LinkIcon, Copy } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface CertificateGeneratorProps {
  userName: string
  activityTitle: string
  activityDate: string
  enrollmentId: number
  onDownload?: () => void
}

export function CertificateGenerator({
  userName,
  activityTitle,
  activityDate,
  enrollmentId,
  onDownload,
}: CertificateGeneratorProps) {
  const certificateRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const addToLinkedIn = () => {
    // LinkedIn Add to Profile URL
    const certName = encodeURIComponent(`Certificate of Completion: ${activityTitle}`)
    const certUrl = encodeURIComponent(window.location.href)
    const orgName = encodeURIComponent("Student Activity Hub")
    const issueYear = new Date(activityDate).getFullYear()
    const issueMonth = new Date(activityDate).getMonth() + 1
    
    // LinkedIn certification URL format
    const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${certName}&organizationName=${orgName}&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${certUrl}`
    
    window.open(linkedInUrl, '_blank', 'width=600,height=600')
  }

  const shareOnLinkedIn = () => {
    // LinkedIn share post URL
    const text = encodeURIComponent(`I'm proud to share that I've earned a certificate for completing "${activityTitle}"! 🎓`)
    const url = encodeURIComponent(window.location.href)
    
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`
    
    window.open(linkedInShareUrl, '_blank', 'width=600,height=600')
  }

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    window.open(facebookUrl, '_blank', 'width=600,height=600')
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`I've earned a certificate for completing "${activityTitle}"! 🎓 #Achievement #Certificate`)
    const url = encodeURIComponent(window.location.href)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
    window.open(twitterUrl, '_blank', 'width=600,height=600')
  }

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`Check out my certificate for completing "${activityTitle}"! 🎓 ${window.location.href}`)
    const whatsappUrl = `https://wa.me/?text=${text}`
    window.open(whatsappUrl, '_blank')
  }

  const shareOnTelegram = () => {
    const text = encodeURIComponent(`I've earned a certificate for completing "${activityTitle}"! 🎓`)
    const url = encodeURIComponent(window.location.href)
    const telegramUrl = `https://t.me/share/url?url=${url}&text=${text}`
    window.open(telegramUrl, '_blank')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }

  const downloadCertificate = async () => {
    if (onDownload) {
      onDownload()
    }

    // Create a canvas to generate the certificate image
    const certificate = certificateRef.current
    if (!certificate) return

    // Use html2canvas library (you'll need to install it)
    // For now, we'll use a simple print approach
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate - ${activityTitle}</title>
          <style>
            body {
              margin: 0;
              padding: 40px;
              font-family: 'Georgia', serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #f5f5f5;
            }
            .certificate {
              width: 800px;
              padding: 60px;
              background: white;
              border: 20px solid #1e40af;
              border-radius: 10px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
              position: relative;
            }
            .certificate::before {
              content: '';
              position: absolute;
              top: 30px;
              left: 30px;
              right: 30px;
              bottom: 30px;
              border: 2px solid #3b82f6;
              pointer-events: none;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .logo {
              width: 80px;
              height: 80px;
              margin: 0 auto 20px;
              background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 40px;
            }
            h1 {
              font-size: 48px;
              color: #1e40af;
              margin: 0 0 10px;
              font-weight: bold;
              letter-spacing: 2px;
            }
            .subtitle {
              font-size: 20px;
              color: #6b7280;
              font-style: italic;
            }
            .content {
              text-align: center;
              margin: 40px 0;
            }
            .presented-to {
              font-size: 18px;
              color: #6b7280;
              margin-bottom: 15px;
            }
            .recipient-name {
              font-size: 42px;
              color: #1f2937;
              font-weight: bold;
              margin: 20px 0;
              border-bottom: 2px solid #1e40af;
              display: inline-block;
              padding-bottom: 10px;
            }
            .description {
              font-size: 18px;
              color: #4b5563;
              margin: 30px 0;
              line-height: 1.8;
            }
            .activity-title {
              font-size: 24px;
              color: #1e40af;
              font-weight: bold;
              margin: 20px 0;
            }
            .footer {
              display: flex;
              justify-content: space-between;
              margin-top: 60px;
              padding-top: 30px;
              border-top: 2px solid #e5e7eb;
            }
            .signature {
              text-align: center;
            }
            .signature-line {
              width: 200px;
              border-top: 2px solid #1f2937;
              margin: 0 auto 10px;
            }
            .signature-label {
              font-size: 14px;
              color: #6b7280;
            }
            .date {
              text-align: center;
              margin-top: 20px;
              font-size: 16px;
              color: #6b7280;
            }
            @media print {
              body {
                background: white;
                padding: 0;
              }
              .certificate {
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">
              <div class="logo">🎓</div>
              <h1>CERTIFICATE</h1>
              <div class="subtitle">of Participation</div>
            </div>
            
            <div class="content">
              <div class="presented-to">This certificate is proudly presented to</div>
              <div class="recipient-name">${userName}</div>
              
              <div class="description">
                For successfully participating and completing
              </div>
              
              <div class="activity-title">${activityTitle}</div>
              
              <div class="date">
                Completed on ${new Date(activityDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            <div class="footer">
              <div class="signature">
                <div class="signature-line"></div>
                <div class="signature-label">Activity Coordinator</div>
              </div>
              <div class="signature">
                <div class="signature-line"></div>
                <div class="signature-label">Date Issued</div>
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            }
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div>
      <Card className="overflow-hidden border-2 border-blue-200 dark:border-blue-800">
        <CardContent className="p-0">
          <div
            ref={certificateRef}
            className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-8 text-center"
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8 border-4 border-blue-600 dark:border-blue-400 shadow-xl">
              <Award className="w-16 h-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t('certificates.certificateOf')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('certificates.thisCertifies')}
              </p>
              <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6 border-b-2 border-blue-600 dark:border-blue-400 inline-block pb-2">
                {userName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('certificates.hasCompleted')}
              </p>
              <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                {activityTitle}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(activityDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 space-y-4">
        <div className="flex gap-4">
          <Button onClick={downloadCertificate} size="lg" className="flex-1">
            <Download className="h-5 w-5 mr-2" />
            {t('certificates.download')}
          </Button>
        </div>
        
        {/* LinkedIn Integration */}
        <Card className="border-2 border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#0A66C2] rounded flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  LinkedIn
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Showcase your achievement to your professional network
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    onClick={addToLinkedIn}
                    className="bg-[#0A66C2] hover:bg-[#004182] text-white"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    {t('certificates.addToLinkedIn')}
                  </Button>
                  <Button 
                    onClick={shareOnLinkedIn}
                    variant="outline"
                    className="border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    {t('certificates.sharePost')}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Sharing */}
        <Card className="border-2 border-purple-100 dark:border-purple-900">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              {t('certificates.share')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t('certificates.shareAchievement')}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Facebook */}
              <Button
                onClick={shareOnFacebook}
                className="bg-[#1877F2] hover:bg-[#0C63D4] text-white"
              >
                <Facebook className="h-4 w-4 mr-2" />
                {t('certificates.shareOnFacebook')}
              </Button>

              {/* Twitter */}
              <Button
                onClick={shareOnTwitter}
                className="bg-[#1DA1F2] hover:bg-[#0C8BD9] text-white"
              >
                <Twitter className="h-4 w-4 mr-2" />
                {t('certificates.shareOnTwitter')}
              </Button>

              {/* WhatsApp */}
              <Button
                onClick={shareOnWhatsApp}
                className="bg-[#25D366] hover:bg-[#1EBE57] text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {t('certificates.shareOnWhatsApp')}
              </Button>

              {/* Telegram */}
              <Button
                onClick={shareOnTelegram}
                className="bg-[#0088CC] hover:bg-[#0077B5] text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                {t('certificates.shareOnTelegram')}
              </Button>

              {/* Copy Link */}
              <Button
                onClick={copyLink}
                variant="outline"
                className="col-span-2 sm:col-span-1"
              >
                <Copy className="h-4 w-4 mr-2" />
                {t('certificates.copyLink')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
