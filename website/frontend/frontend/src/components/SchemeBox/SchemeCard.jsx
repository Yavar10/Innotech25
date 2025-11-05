import React from "react";
import { CreditCard, Zap, ChevronRight } from "lucide-react";

const SchemeCard = ({ title, subtitle, description, amount, status ,link,type}) => {
  return (
    <div
      className="rounded-xl h-fit w-full sm:w-[45%] lg:w-[30%] border bg-card text-card-foreground shadow-soft cursor-pointer hover:shadow-medium transition-all active:scale-95 animate-fade-in"
      style={{ animationDelay: "50ms" }}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <CreditCard className="text-green-600 w-6 h-6" />
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
              <Zap className="w-4 h-4 text-orange-300 flex-shrink-0" />
            </div>

            <p className="text-sm text-muted-foreground mb-2">{description}</p>

            <div className="flex items-center justify-between gap-2">
              <div className="text-lg text-green-600 font-bold">
                ₹{amount}
              </div>
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center text-white bg-green-400 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  {status}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;
