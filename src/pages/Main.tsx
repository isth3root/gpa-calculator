import React, { useState, useEffect } from "react";
import Input from "../components/common/Input";
import { Lesson } from "../interfaces/lesson";
import Button from "../components/common/Button";
import ThemeToggle from "../components/ThemeToggle";

const GPAForm: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      name: "",
      grade: 0,
      courses: 0,
    },
  ]);
  const [gpa, setGpa] = useState<string>("0.00");

  useEffect(() => {
    // This effect can be used for validation or other side effects in the future
  }, [lessons]);

  const handleLessonChange = (
    index: number,
    field: keyof Lesson,
    value: string | number
  ) => {
    const newLessons = [...lessons];
    newLessons[index] = { ...newLessons[index], [field]: value };
    setLessons(newLessons);
  };

  const addLessonField = () => {
    setLessons([
      ...lessons,
      {
        name: "",
        grade: 0,
        courses: 0,
      },
    ]);
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

    const calculatedGpa = totalCourses ? (totalPoints / totalCourses).toFixed(2) : "0.00";
    setGpa(calculatedGpa);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">GPA Calculator</h1>
        <div className="bg-background dark:bg-gray-800 shadow-lg rounded-lg p-6">
          {lessons.map((lesson, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-center">
              <Input
                type="text"
                placeholder="Lesson Name"
                value={lesson.name}
                onChange={(e) =>
                  handleLessonChange(index, "name", e.target.value)
                }
                className="col-span-1 md:col-span-2 bg-background dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2"
                maxLength={30}
              />
              <Input
                type="number"
                placeholder="Grade (0-20)"
                value={lesson.grade === 0 ? "" : lesson.grade.toString()}
                onChange={(e) =>
                  handleLessonChange(index, "grade", Number(e.target.value))
                }
                className="bg-background dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2"
                min={0}
                max={20}
                step={0.25}
              />
              <Input
                type="number"
                placeholder="Courses"
                value={lesson.courses === 0 ? "" : lesson.courses.toString()}
                onChange={(e) =>
                  handleLessonChange(index, "courses", Number(e.target.value))
                }
                className="bg-background dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2"
                min={1}
                max={5}
              />
              <Button
                onClick={() => deleteLessonField(index)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                value="Delete"
                disabled={lessons.length === 1}
              />
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={addLessonField}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
              value="Add Lesson"
              disabled={false}
            />
            <Button
              onClick={calculateGPA}
              className="bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded"
              value="Calculate GPA"
              disabled={false}
            />
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-primary">Your GPA: {gpa}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPAForm;
