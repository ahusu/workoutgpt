let promptGen = (questionNumber, goal)=>{
  let numQues = 5;
  let message = '';
  if (questionNumber === 0) {
    message = `You are attempting to get to know a user so that you can help them achieve their fitness goal.
    Their fitness goal is ${goal}. You will eventually ask ${numQues} that they will answer.
    The past messages contains relevant information.

    For now pick just 1 question to follow up with. Please state that question with no additional text of any kind.`;
  } else if (questionNumber < numQues-1) {
    message = `You are attempting to get to know a user so that you can help them achieve their fitness goal.
    Their fitness goal is ${goal}. You will eventually ask ${numQues} that they will answer.
    The past messages contains relevant information. Please do not ask the same question more than once.

    For now pick just 1 question to follow up with. Please state that question with no additional text of any kind.
    `
  } else if (questionNumber === numQues - 1) {
    message = `Please help me design a fitness plan for someone who is trying to achieve a fitness goal. Their fitness goal is ${goal}.
    The past messages contains relevant information.

    Please generate a detailed plan that has suggestions for what to do for every day of the week.`
  }

  return message
}

export default promptGen;