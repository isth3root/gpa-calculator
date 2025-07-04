import React, { useState, useEffect } from "react";
import Input from "../components/common/Input";
import { Lesson } from "../interfaces/lesson";
import Button from "../components/common/Button";

const GPAForm: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      name: "",
      grade: 0,
      courses: 0,
    },
  ]);
  const [showGPA, setShowGPA] = useState(false);
  const [crypticMessage, setCrypticMessage] = useState("");
  const [isAddLessonDisabled, setIsAddLessonDisabled] = useState(true);

  useEffect(() => {
    const latestLesson = lessons[lessons.length - 1];
    const isValidLesson =
      latestLesson.grade > 0 &&
      latestLesson.grade <= 20 &&
      latestLesson.courses >= 1 &&
      latestLesson.courses <= 5;
    setIsAddLessonDisabled(!isValidLesson);
  }, [lessons]);

  const handleLessonChange = (
    index: number,
    field: keyof Lesson,
    value: string | number
  ) => {
    const newLessons = [...lessons];
    newLessons[index] = { ...newLessons[index], [field]: value };
    setLessons(newLessons);
    setShowGPA(false);
  };

  const addLessonField = () => {
    const latestLesson = lessons[lessons.length - 1];
    const isValidLesson =
      latestLesson.grade > 0 &&
      latestLesson.grade <= 20 &&
      latestLesson.courses >= 1 &&
      latestLesson.courses <= 5;

    if (isValidLesson) {
      setLessons([
        ...lessons,
        {
          name: "",
          grade: 0,
          courses: 0,
        },
      ]);
    }
  };

  const deleteLessonField = (index: number) => {
    if (lessons.length > 1) {
      const newLessons = lessons.filter(
        (_, lessonIndex) => lessonIndex !== index
      );
      setLessons(newLessons);
    }
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCourses = 0;

    lessons.forEach((lesson) => {
      totalPoints += lesson.grade * lesson.courses;
      totalCourses += lesson.courses;
    });

    return totalCourses ? (totalPoints / totalCourses).toFixed(2) : "0.00";
  };

  const getCrypticMessage = (gpaScore: number, hasSignificantInput: boolean): string => {
    if (!hasSignificantInput) {
        return "The scroll is blank... judgment awaits.";
    }
    if (isNaN(gpaScore)) {
      return "The runes are muddled, your fate unclear.";
    }
    // Check for 0 GPA specifically, can occur if all grades are 0 but courses exist
    if (gpaScore === 0) {
        return "Emptiness stares back... a void of effort, or perhaps, a path yet untrodden?";
    }
    if (gpaScore > 0 && gpaScore < 10) {
      return "Whispers from the shadows speak of your struggles...";
    }
    if (gpaScore >= 10 && gpaScore < 14) {
      return "A precarious balance... the path is still dark, tread carefully.";
    }
    if (gpaScore >= 14 && gpaScore < 18) {
      return "You navigate the arcane path with growing confidence. The spirits are watching.";
    }
    if (gpaScore >= 18 && gpaScore <= 20) {
      return "The ancient texts illuminate your way! A true scholar of the unseen arts.";
    }
    return "The runes are muddled, your fate unclear."; // Default for unexpected values
  };

  const handleSubmit = () => {
    const hasSignificantInput = lessons.some(
      (lesson) => lesson.courses > 0 // We only really need courses to be > 0 for a calculation
    );

    const gpaValue = parseFloat(calculateGPA());
    setCrypticMessage(getCrypticMessage(gpaValue, hasSignificantInput));
    setShowGPA(true);
  };

  const canCalculate = lessons.some(lesson => lesson.courses > 0 && lesson.grade > 0 && lesson.grade <=20 && lesson.courses <=5 );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-creepy select-none p-4">
      <div className="mb-10 text-center">
        <h1 className="title-creepy text-flicker">The Scholarly Reckoning</h1>
        <ul className="mt-3 text-sm text-gray-400">
          <li>(Lesson name is optional, mortal)</li>
        </ul>
      </div>
      <div className="container p-6 bg-gray-800 rounded-lg shadow-xl flex flex-col items-center max-w-2xl w-full">
        {lessons.map((lesson, index) => (
          <div key={index} className="mb-6 flex items-center w-full gap-3">
            <Input
              type="text"
              placeholder="Subject of Dread"
              value={lesson.name}
              onChange={(e) =>
                handleLessonChange(index, "name", e.target.value)
              }
              className="input-creepy flex-grow"
              maxLength={30}
            />
            <Input
              type="number"
              placeholder="Effort (0-20)"
              value={lesson.grade === 0 ? "" : lesson.grade.toString()}
              onChange={(e) =>
                handleLessonChange(index, "grade", Number(e.target.value))
              }
              className="input-creepy w-1/4"
              min={0}
              max={20}
              step={0.25}
            />
            <Input
              type="number"
              placeholder="Units of Sanity"
              value={lesson.courses === 0 ? "" : lesson.courses.toString()}
              onChange={(e) =>
                handleLessonChange(index, "courses", Number(e.target.value))
              }
              className="input-creepy w-1/4"
              min={1}
              max={5}
            />
            <Button
              onClick={() => deleteLessonField(index)}
              className={`button-creepy button-delete-creepy w-auto px-3 ${
                lessons.length === 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              value="Banish"
              disabled={lessons.length === 1}
            />
          </div>
        ))}

        <div className="flex gap-5 mt-4">
          <Button
            onClick={addLessonField}
            className={`button-creepy button-add-creepy ${
              isAddLessonDisabled
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={isAddLessonDisabled}
            value="Summon Another"
          />
          <Button
            onClick={handleSubmit}
            className={`button-creepy button-calculate-creepy ${
              !canCalculate && lessons.length > 0 // Allow click if empty to show "blank scroll"
                ? (lessons.length === 1 && lessons[0].grade === 0 && lessons[0].courses === 0 ? "" :"opacity-50 cursor-not-allowed")
                : ""
            }`}
            disabled={!canCalculate && !(lessons.length === 1 && lessons[0].grade === 0 && lessons[0].courses === 0 && lessons[0].name === "")}
            value="Reveal Fate"
          />
        </div>
        {showGPA && (
          <div className="mt-8 text-center">
            <h2 className="gpa-result-creepy">Calculated Doom: {calculateGPA()}</h2>
            {crypticMessage && <p className="text-gray-400 mt-2 text-lg">{crypticMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default GPAForm;
