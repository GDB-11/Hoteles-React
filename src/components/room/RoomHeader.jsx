import colors from "../../helpers/ColorsHelper.js";

function RoomHeader({ roomName }) {
    return (
        <div style={{ backgroundColor: colors.beige }} className="py-6">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-bold" style={{ color: colors.darkBrown }}>
                    {roomName}
                </h1>
            </div>
        </div>
    );
}

export default RoomHeader;