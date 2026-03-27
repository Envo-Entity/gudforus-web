import Image from "next/image";
import { Signal, Wifi, BatteryFull, ChevronLeft, Bookmark, Share, BadgeCheck, Heart, Leaf, Settings, Home, QrCode, User } from "lucide-react";

export default function PhonePreview() {
  return (
    <section className="relative -mt-8 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 border-4 border-white">
          {/* Background Image */}
          <Image
            alt="Abstract clean ingredients background with UI overlay representation"
            className="w-full h-[500px] sm:h-[650px] md:h-[850px] object-cover opacity-80"
            src="/app-images/hero-background.webp"
            width={1200}
            height={850}
            priority
          />

          {/* Phone Mockup Container */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]">
              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[2rem] sm:rounded-[3rem] border-[8px] sm:border-[12px] border-gray-900 shadow-2xl overflow-hidden ring-1 ring-white/10 h-[500px] sm:h-[600px] md:h-[720px] mx-auto transform hover:scale-[1.01] transition-transform duration-500">
                {/* Status Bar */}
                <div className="absolute top-0 w-full h-10 sm:h-12 bg-black/80 z-20 flex justify-between px-4 sm:px-6 items-center text-[10px] sm:text-[12px] font-medium text-white backdrop-blur-sm">
                  <span>9:41</span>
                  <div className="flex gap-1.5 items-center">
                    <Signal className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <Wifi className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <BatteryFull className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>

                {/* Dynamic Island */}
                <div className="absolute top-2 sm:top-3 left-1/2 transform -translate-x-1/2 w-20 sm:w-28 h-5 sm:h-7 bg-black rounded-full z-30"></div>

                {/* Phone Content */}
                <div className="w-full h-full bg-[#F5F7FA] overflow-hidden flex flex-col pt-10 sm:pt-12">
                  {/* Navigation Buttons */}
                  <div className="px-4 sm:px-6 pb-2 flex justify-between items-center">
                    <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700">
                      <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700">
                        <Bookmark className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700">
                        <Share className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto no-scrollbar pb-16 sm:pb-20">
                    {/* Product Image */}
                    <div className="px-4 sm:px-6 pt-4 flex flex-col items-center">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-b from-white to-gray-50 shadow-soft flex items-center justify-center mb-4 sm:mb-6 relative p-3 sm:p-4 border border-gray-100">
                        <Image
                          alt="Scanned Product"
                          className="w-full h-full rounded-full object-cover opacity-90"
                          src="/app-images/hero-background.webp"
                          width={160}
                          height={160}
                        />
                        <div className="absolute bottom-0 sm:bottom-1 right-1 sm:right-2 bg-green-100 text-green-700 text-[8px] sm:text-[10px] font-bold px-2 py-0.5 sm:py-1 rounded-full border border-green-200">
                          VERIFIED
                        </div>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900 text-center leading-tight">
                        Artisan Oat Milk
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Barista Edition • 1L
                      </p>
                    </div>

                    {/* Impact Score Card */}
                    <div className="px-4 sm:px-6 mt-4 sm:mt-6">
                      <div className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-lg relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150"></div>
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-green-100 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
                              Impact Score
                            </span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-4xl sm:text-5xl font-display font-bold tracking-tight">
                                94
                              </span>
                              <span className="text-base sm:text-lg text-green-200/80 font-medium">
                                /100
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mb-2">
                              <BadgeCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              <span className="text-[10px] sm:text-xs font-bold">
                                EXCELLENT
                              </span>
                            </div>
                            <p className="text-[9px] sm:text-[11px] text-green-100 max-w-[70px] sm:max-w-[80px] leading-tight ml-auto">
                              Top 5% in category
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metric Cards */}
                    <div className="px-4 sm:px-6 mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                      {/* Health Card */}
                      <MetricCard
                        icon={<Heart className="w-4 h-4 sm:w-5 sm:h-5" />}
                        iconBgColor="bg-red-50"
                        iconColor="text-red-500"
                        title="Health"
                        status="Great"
                        statusColor="text-green-600"
                        progress={85}
                        progressColor="bg-green-500"
                        description="No added sugars, high calcium."
                      />

                      {/* Environment Card */}
                      <MetricCard
                        icon={<Leaf className="w-4 h-4 sm:w-5 sm:h-5" />}
                        iconBgColor="bg-blue-50"
                        iconColor="text-blue-500"
                        title="Environment"
                        status="Low CO2"
                        statusColor="text-blue-600"
                        progress={92}
                        progressColor="bg-blue-500"
                        description="0.4kg CO2e per kg (Very Low)"
                      />

                      {/* Processing Card */}
                      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                              Processing
                            </h3>
                            <span className="text-[10px] sm:text-xs font-semibold text-gray-500">
                              Minimally
                            </span>
                          </div>
                          <p className="text-[9px] sm:text-[10px] text-gray-400">
                            NOVA Group 1: Unprocessed or minimally processed
                            foods.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 bg-black/90 text-white backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full flex gap-6 sm:gap-8 shadow-2xl z-40">
                    <Home className="w-5 h-5 sm:w-6 sm:h-6 opacity-50" />
                    <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E7D32]" />
                    <User className="w-5 h-5 sm:w-6 sm:h-6 opacity-50" />
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-black/20 rounded-full z-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  title: string;
  status: string;
  statusColor: string;
  progress: number;
  progressColor: string;
  description: string;
}

function MetricCard({
  icon,
  iconBgColor,
  iconColor,
  title,
  status,
  statusColor,
  progress,
  progressColor,
  description,
}: MetricCardProps) {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${iconBgColor} flex items-center justify-center ${iconColor} shrink-0`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900">
            {title}
          </h3>
          <span
            className={`text-[10px] sm:text-xs font-semibold ${statusColor}`}
          >
            {status}
          </span>
        </div>
        <div className="w-full bg-gray-100 h-1 sm:h-1.5 rounded-full overflow-hidden">
          <div
            className={`${progressColor} h-full rounded-full`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-[9px] sm:text-[10px] text-gray-400 mt-1 sm:mt-1.5">
          {description}
        </p>
      </div>
    </div>
  );
}
