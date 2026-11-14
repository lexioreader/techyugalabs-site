<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="/rss/channel/title"/> — RSS feed</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            background: #0a0e1a;
            color: #eef0f6;
            max-width: 42rem;
            margin: 3rem auto;
            padding: 0 1.5rem;
            line-height: 1.6;
          }
          h1 { font-family: Georgia, serif; font-weight: 500; letter-spacing: -0.01em; }
          .note {
            background: #0f1522; border: 1px solid #2a3449; border-radius: 8px;
            padding: 1rem 1.25rem; margin-bottom: 2rem; color: #b4bcd0; font-size: 0.9rem;
          }
          a { color: #c8a56b; }
          article { border-bottom: 1px solid #2a3449; padding: 1.5rem 0; }
          article h2 { margin: 0 0 0.25rem; font-family: Georgia, serif; font-weight: 500; }
          article h2 a { color: #eef0f6; text-decoration: none; }
          article p { color: #b4bcd0; margin: 0.25rem 0 0.5rem; }
          time { color: #8792ad; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; }
        </style>
      </head>
      <body>
        <h1><xsl:value-of select="/rss/channel/title"/></h1>
        <div class="note">
          This is an RSS feed. Paste <code><xsl:value-of select="/rss/channel/atom:link/@href"/></code> into a feed reader like NetNewsWire, Feedly, or Inoreader to subscribe. New guides appear here first.
        </div>
        <xsl:for-each select="/rss/channel/item">
          <article>
            <time><xsl:value-of select="pubDate"/></time>
            <h2><a><xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute><xsl:value-of select="title"/></a></h2>
            <p><xsl:value-of select="description"/></p>
          </article>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
