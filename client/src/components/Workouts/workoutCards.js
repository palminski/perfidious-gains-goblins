<>
<Card style={{width: '18rem'}}>
    <Card.Header>Workouts</Card.Header>
    <Card.Body>
        <Card.Title>Exercises
            <button onClick={toggleModal}>Find Excersises!</button> 
        </Card.Title>
        <Card.Subtitle className="mb-2 bg-dark"></Card.Subtitle> 

        <Card.Text>
            {results && results.map((exercise,index) => (
                <div key={index}>
                <p>Type:  {exercise.type}</p>
                <p>Muscle Group:  {exercise.muscle}</p>
                <p>Difficulty:  {exercise.difficulty}</p>
                <p>Equipment Used:  {exercise.equipment}</p>
                <h4>Instructions:</h4>
                    <p>{exercise.instructions}</p>
                    <button onClick={() => addToJournal(exercise.name)}>Add Exercise</button>
                </div>
            ))}
        </Card.Text>
    </Card.Body>
</Card>
</>
