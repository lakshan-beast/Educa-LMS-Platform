import Todo from "./tools/Todo";
import Calculator from "./tools/Calculator";
import Pomodoro from "./tools/Pomodoro";
import UnitConverter from "./tools/UnitConverter";
import GradeCalculator from "./tools/GradeCalculator";
import Motivation from "./tools/Motivation";
import ExamCountdown from "./tools/ExamCounter";

const Tools = () => {
  return (
    <div className="tools-page">
      <main className="system-container" style={{ marginTop: "100px" }}>
        <h2>
          Educa <span>Smart Tools</span>
        </h2>

        <div className="tools-grid">
          <ExamCountdown />
          <Motivation />
          <Todo />
          <Calculator />
          <Pomodoro />
          <UnitConverter />
          <GradeCalculator />
        </div>
      </main>
    </div>
  );
};

export default Tools;
