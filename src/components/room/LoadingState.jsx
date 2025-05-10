function LoadingState() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex justify-center items-center h-64">
                <div className="animate-pulse text-xl text-amber-800">
                    Cargando información de la habitación...
                </div>
            </div>
        </div>
    );
}

export default LoadingState;