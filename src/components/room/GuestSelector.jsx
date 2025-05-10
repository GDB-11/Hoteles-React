import { Users, Minus, Plus } from "lucide-react";
import colors from "../../helpers/ColorsHelper.js";

function GuestSelector({ guests, maxGuests, onChange }) {
  const isDecreaseDisabled = guests <= 1;
  const isIncreaseDisabled = guests >= maxGuests;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1" style={{ color: colors.darkBrown }}>Huéspedes</label>
      <div className="border rounded-md overflow-hidden" style={{ borderColor: colors.mediumGray }}>
        <div className="flex items-center p-2">
          <div className="flex items-center space-x-2 w-full">
            <Users size={20} style={{ color: colors.primary }} />
            <div className="flex-grow">
              <span className="ml-1 text-sm font-medium">
                {guests} {guests === 1 ? 'Huésped' : 'Huéspedes'}
              </span>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => !isDecreaseDisabled && onChange(-1)}
                disabled={isDecreaseDisabled}
                className={`
                  h-8 w-8 flex items-center justify-center rounded-l-md transition-all duration-200
                  ${isDecreaseDisabled 
                    ? 'bg-gray-100 cursor-not-allowed' 
                    : `bg-amber-50 hover:bg-amber-100 active:bg-amber-200 cursor-pointer`
                  }
                `}
                aria-label="Disminuir huéspedes"
              >
                <Minus 
                  size={16} 
                  strokeWidth={2.5}
                  className={isDecreaseDisabled ? 'text-gray-300' : 'text-amber-800'} 
                />
              </button>
              <div className="h-8 w-12 flex items-center justify-center border-x" style={{ borderColor: colors.mediumGray }}>
                <span className="text-sm font-medium">{guests}</span>
              </div>
              <button
                type="button"
                onClick={() => !isIncreaseDisabled && onChange(1)}
                disabled={isIncreaseDisabled}
                className={`
                  h-8 w-8 flex items-center justify-center rounded-r-md transition-all duration-200
                  ${isIncreaseDisabled 
                    ? 'bg-gray-100 cursor-not-allowed' 
                    : `bg-amber-50 hover:bg-amber-100 active:bg-amber-200 cursor-pointer`
                  }
                `}
                aria-label="Aumentar huéspedes"
              >
                <Plus 
                  size={16} 
                  strokeWidth={2.5}
                  className={isIncreaseDisabled ? 'text-gray-300' : 'text-amber-800'} 
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestSelector;