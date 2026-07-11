"use client";

import {
  IconBrowser,
  IconWorld,
  IconDatabaseSearch,
  IconServer2,
  IconRouter,
  IconBuildingBank,
  IconFileCode,
  IconHome,
  IconArrowDown,
  IconDeviceDesktop
} from "@tabler/icons-react";

type StepProps = {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
};

function Step({ icon, title, subtitle }: StepProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-card flex w-auto items-center gap-3 rounded-lg border px-3 py-2.5">
        {icon && <div className="bg-muted rounded-lg p-2">{icon}</div>}

        <div>
          <h4 className="font-medium">{title}</h4>
          {subtitle && (
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          )}
        </div>
      </div>

      <IconArrowDown className="text-muted-foreground my-2 size-5" />
    </div>
  );
}

export function HowBrowserLoadsWebsite() {
  return (
    <div className="flex flex-col items-center py-8">
      <Step
        icon={<IconDeviceDesktop size={24} />}
        title='Type "google.com"'
        subtitle="User enters the website address"
      />

      <Step
        icon={<IconBrowser size={24} />}
        title="Web Browser"
        subtitle="Chrome, Edge, Firefox, Safari..."
      />

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="bg-card w-64 rounded-xl border p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <IconDatabaseSearch size={24} />
              <div>
                <p className="font-medium">DNS Server</p>
                <p className="text-muted-foreground text-sm">
                  Finds Google&rsquo;s IP address
                </p>
              </div>
            </div>
          </div>
        </div>

        <IconArrowDown className="text-muted-foreground my-2 size-5" />
      </div>

      <Step
        icon={<IconWorld size={24} />}
        title="Internet (ISP)"
        subtitle="Your Internet Service Provider"
      />

      <Step
        icon={<IconRouter size={24} />}
        title="Network Routers"
        subtitle="Forward the request across the Internet"
      />

      <Step
        icon={<IconBuildingBank size={24} />}
        title="Google Data Center"
        subtitle="Receives your request"
      />

      <Step
        icon={<IconServer2 size={24} />}
        title="Google Web Server"
        subtitle="Processes the request"
      />

      <Step
        icon={<IconFileCode size={24} />}
        title="HTML, CSS & JavaScript"
        subtitle="Website files are returned"
      />

      <Step
        icon={<IconBrowser size={24} />}
        title="Back to Your Browser"
        subtitle="Browser renders the page"
      />

      <div className="bg-muted w-72 rounded-xl border p-5 text-center shadow-sm">
        <IconHome className="mx-auto mb-2" size={30} />
        <h4 className="font-semibold">Google Home Page</h4>
        <p className="text-muted-foreground mt-1 text-sm">
          The webpage is now displayed.
        </p>
      </div>
    </div>
  );
}
