





const Exams = ({ exams, setShowCourses }) => {


    return(
        <div>
            {
                exams.map((exam) => (
                    <div key={exam.labID}>
                        {exam.leistung}
                        {exam.pstatus}
                    </div>
                ))
            }

            <button onClick={() => setShowCourses(false)}>Close</button>
        </div>
    );
}



export default Exams;