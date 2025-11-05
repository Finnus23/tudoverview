const Exams = ({ exams, setShowCourses }) => {
  return (
    <div className="flex flex-col gap-4 pb-48">
      {exams.map((exam) => {
        const statusColor =
          exam.pstatus.toLowerCase() === 'bestanden'
            ? 'bg-green-500/20 border-green-500/50'
            : 'bg-red-500/20 border-red-500/50';

        return (
          <div
            key={exam.labID}
            className={`p-4 rounded-xl border ${statusColor} backdrop-blur-md`}
          >
            <div className="font-semibold text-lg">{exam.leistung}</div>
            <div className="text-sm text-gray-300 mt-1">
              Prüfer: {exam.prueferVorname} {exam.prueferNachname}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Datum: {exam.pdatum} | Note: {exam.pnote} | Status: {exam.pstatus}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Exams;
