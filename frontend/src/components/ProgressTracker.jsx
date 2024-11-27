
const ProgressTracker = ({ progress, goal }) => {
    const percentage = Math.min((progress.length / goal) * 100, 100);

    return (
        <div>
            <div className="text-sm">{`Progress: ${progress.length}/${goal}`}</div>
            <div className="w-full h-4 bg-gray-200 rounded-full">
                <div
                    className="h-4 bg-green-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressTracker;
