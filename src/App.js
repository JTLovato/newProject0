import { useState, useEffect } from 'react'

const Button = ({ click, text }) => {
  console.log('click')
  return (
  <button onClick={click}>
    {text}
  </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)

  const [visible, setVisible] = useState(false);

  const goodPlus = () => setGood(good + 1);
  const neutralPlus = () => setNeutral(neutral + 1);
  const badPlus = () => setBad(bad + 1);

  const StatDisplay = (props) => {
    const { good, neutral, bad, total, average, positive } = props;
    return (
      <>
          <StatisticLine line="good" value={good}/>
          <StatisticLine line="neutral" value={neutral}/>
          <StatisticLine line="bad" value={bad}/>
          <StatisticLine line="total" value={total}/>
          <StatisticLine line="average" value={average}/>
          <StatisticLine line="positive" value={positive}/>
      </>
    );
  };

  const StatisticLine = (props) => {
    return (
      <tr>
        <td>{props.line}:</td>
        <td>{props.value}</td>
      </tr>
    )
  }

  const total = good + bad + neutral
  const average = (good + bad + neutral) / 3
  const postive = (good / (bad + neutral + good))

  useEffect(() => {
    if (good || neutral || bad !== 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [good, bad, neutral]);

  const statsDisplay = () => {
    if (visible === true) {
      return (
        <StatDisplay
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={postive}
        />
      );
    } else {
      return <h1>No Statistics Available</h1>;
    }
  };



  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))
  const updateVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  }

  const changeAnec = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  

  return (
    <div>
      <h1>give feedback</h1>
        <Button click={goodPlus} text="good" />
        <Button click={neutralPlus} text="neutral" />
        <Button click={badPlus} text="bad" />
      <h1>statistics</h1>
      {statsDisplay()}
      <h2>Anecdote of the day</h2>
      <div>
        {anecdotes[selected]}
      </div>
      <div>has {votes[selected]} votes</div>
      <Button click={updateVote} text="Vote" />
      <Button click={changeAnec} text="New Anecdote"/>
      <h2>Anecdote with most votes</h2>
      <div>
        {anecdotes[votes.indexOf(Math.max(...votes))]}
      </div>
      <div>has {Math.max(...votes)} votes</div>
    </div>
  )
}

export default App