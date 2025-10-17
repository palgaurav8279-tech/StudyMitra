import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdPanel() {
  useEffect(() => {
    // Initialize Google Ads
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="hidden lg:block lg:w-[30%]">
      <div className="sticky top-20 space-y-6">
        <div className="overflow-hidden" data-testid="ad-space-1">
          <div className="p-6">
            <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7831913232382194"
                crossOrigin="anonymous"
              ></script>
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-7831913232382194"
                data-ad-slot="4563311596"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>
          </div>
        </div>
        <div className="overflow-hidden" data-testid="ad-space-2">
          <div className="p-6">
            <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7831913232382194"
                crossOrigin="anonymous"
              ></script>
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-7831913232382194"
                data-ad-slot="5481835110"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
