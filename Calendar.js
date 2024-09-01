import React, { useState } from 'react';
import './Calendar.css';

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const today = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayIndex = new Date(currentYear, currentMonth, daysInMonth).getDay();
    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();
    const nextDays = 7 - lastDayIndex - 1;

    const months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];

    // 前月の日付を含むカレンダー配列の生成
    let days = [];

    // 前月の日付を追加
    for (let x = firstDayIndex; x > 0; x--) {
        days.push(
            <div key={`prev${x}`} className="prev-date">
                {prevLastDay - x + 1}
            </div>
        );
    }

    // 今月の日付を追加
    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

        days.push(
            <div
                key={`curr${i}`}
                className={`calendar-day ${isToday ? 'today' : ''} ${
                    new Date(currentYear, currentMonth, i).getDay() === 0 ? 'sunday' : ''
                } ${
                    new Date(currentYear, currentMonth, i).getDay() === 6 ? 'saturday' : ''
                }`}
                onClick={() => handleDateClick(i)}
            >
                {i}
            </div>
        );
    }

    // 次月の日付を追加
    for (let j = 1; j <= nextDays; j++) {
        days.push(
            <div key={`next${j}`} className="next-date">
                {j}
            </div>
        );
    }

    // 日付クリック時の処理（To-Doリスト表示）
    const handleDateClick = (date) => {
        alert(`Selected Date: ${date}`);
        // TODO: To-Doリスト表示機能を実装
    };

    // 月移動の処理
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>←</button>
                <h2>{`${months[currentMonth]} ${currentYear}`}</h2>
                <button onClick={handleNextMonth}>→</button>
            </div>
            <div className="calendar">
                <div className="calendar-days">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                        <div key={index} className="calendar-day-name">{day}</div>
                    ))}
                </div>
                <div className="calendar-grid">
                    {days}
                </div>
            </div>
        </div>
    );
}

export default Calendar;
