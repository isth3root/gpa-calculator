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

  const handleSubmit = () => {
    if (lessons.length > 1) {
      setShowGPA(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen font-yekan font-bold text-md select-none">
      <div className="mb-5">
        <h1 className="text-3xl">محاسبه معدل</h1>
        <ul className="mt-5">
          <li>توجه : نام درس الزامی نیست.</li>
        </ul>
      </div>
      <div className="container p-4 flex flex-col items-center">
        {lessons.map((lesson, index) => (
          <div key={index} className="mb-4 flex items-center">
            <Input
              type="text"
              placeholder="نام درس"
              value={lesson.name}
              onChange={(e) =>
                handleLessonChange(index, "name", e.target.value)
              }
              className="border p-2 rounded-lg focus:shadow-lg outline-none w-1/4"
              maxLength={20}
            />
            <Input
              type="number"
              placeholder="نمره"
              value={lesson.grade === 0 ? "" : lesson.grade.toString()}
              onChange={(e) =>
                handleLessonChange(index, "grade", Number(e.target.value))
              }
              className="border p-2 mr-2 rounded-lg focus:shadow-lg outline-none w-1/5"
              min={0}
              max={20}
              step={0.25}
            />
            <Input
              type="number"
              placeholder="واحد"
              value={lesson.courses === 0 ? "" : lesson.courses.toString()}
              onChange={(e) =>
                handleLessonChange(index, "courses", Number(e.target.value))
              }
              className="border p-2 mr-2 rounded-lg focus:shadow-lg outline-none w-1/5"
              min={1}
              max={5}
            />
            <Button
              onClick={() => deleteLessonField(index)}
              className={`bg-red-600 text-white p-2 ml-2 rounded mr-3 w-1/5  ${
                lessons.length === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-700"
              }`}
              value="حذف"
              disabled={lessons.length === 1}
            />
          </div>
        ))}

        <div className="flex gap-5">
          <Button
            onClick={addLessonField}
            className={`bg-[#367588] text-white p-2 rounded mr-2  ${
              isAddLessonDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#448396]"
            }`}
            disabled={isAddLessonDisabled}
            value="اضافه کردن"
          />
          <Button
            onClick={handleSubmit}
            className="bg-[#228B22] text-white p-2 rounded hover:bg-[#3bb43b]"
            disabled={false}
            value="حساب کن"
          />
        </div>
        {showGPA && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">معدل: {calculateGPA()}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default GPAForm;
