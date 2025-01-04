import React, { useState } from 'react';
import { Calendar, Clock, Users, X, Edit, Trash, ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarView = ({ meetings }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const hasMeeting = (day) => {
    const dateToCheck = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    return meetings.some(meeting => meeting.date === dateToCheck);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      const hasMeetingOnDay = hasMeeting(day);

      days.push(
        <div 
          key={day}
          className={`h-12 p-1 border relative ${
            isToday ? 'bg-blue-50' : ''
          }`}
        >
          <span className={`text-sm ${isToday ? 'font-bold' : ''}`}>
            {day}
          </span>
          {hasMeetingOnDay && (
            <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-blue-500" />
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Calendar View</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigateMonth(-1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button 
            onClick={() => navigateMonth(1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium p-2 bg-gray-50">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 text-sm text-gray-600">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <span>Meeting scheduled</span>
      </div>
    </div>
  );
};

const UpcomingMeetings = ({ meetings, onDelete, onEdit }) => {
  const sortedMeetings = [...meetings].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Upcoming Meetings</h3>
      <div className="space-y-4">
        {sortedMeetings.map(meeting => (
          <div key={meeting.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">{meeting.title}</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(meeting)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit meeting"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => onDelete(meeting.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete meeting"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
            <div className="mt-2 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{meeting.date} at {meeting.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{meeting.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{meeting.participants}</span>
              </div>
              {meeting.description && (
                <div className="text-gray-500">
                  {meeting.description}
                </div>
              )}
            </div>
          </div>
        ))}
        {meetings.length === 0 && (
          <p className="text-gray-500 text-center py-4">No upcoming meetings</p>
        )}
      </div>
    </div>
  );
};

const MeetingForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: 30,
    participants: '',
    description: '',
    ...(initialData || {})
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            {initialData ? 'Edit Meeting' : 'Schedule Meeting'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
              className="w-full p-2 border rounded-lg"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>1 hour</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Participants</label>
            <input
              type="text"
              value={formData.participants}
              onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
              placeholder="Enter email addresses"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {initialData ? 'Update Meeting' : 'Schedule Meeting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MeetingScheduler = () => {
  const initialMeetings = [
    {
      id: 1,
      title: "Weekly Team Sync",
      date: "2025-01-04",
      time: "10:00",
      duration: 30,
      participants: "team@company.com",
      description: "Regular team sync meeting"
    },
    {
      id: 2,
      title: "Project Review",
      date: "2025-01-06",
      time: "14:00",
      duration: 60,
      participants: "manager@company.com, team@company.com",
      description: "Monthly project status review"
    },
    {
      id: 3,
      title: "Client Meeting",
      date: "2025-01-08",
      time: "11:00",
      duration: 45,
      participants: "client@client.com, sales@company.com",
      description: "New feature discussion"
    },
    {
      id: 4,
      title: "Sprint Planning",
      date: "2025-01-15",
      time: "09:00",
      duration: 60,
      participants: "developers@company.com",
      description: "Planning for next sprint"
    },
    {
      id: 5,
      title: "Design Review",
      date: "2025-01-22",
      time: "13:00",
      duration: 30,
      participants: "design@company.com, product@company.com",
      description: "Review new design proposals"
    }
  ];

  const [meetings, setMeetings] = useState(initialMeetings);
  const [showForm, setShowForm] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);

  const handleDelete = async (id) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
  };

  const handleEdit = (meeting) => {
    setEditingMeeting(meeting);
    setShowForm(true);
  };

  const handleSubmit = async (meetingData) => {
    try {
      if (editingMeeting) {
        const updatedMeeting = {
          ...meetingData,
          id: editingMeeting.id
        };
        setMeetings(meetings.map(meeting => 
          meeting.id === editingMeeting.id ? updatedMeeting : meeting
        ));
      } else {
        const newMeeting = {
          ...meetingData,
          id: meetings.length + 1
        };
        setMeetings([...meetings, newMeeting]);
      }
      setShowForm(false);
      setEditingMeeting(null);
    } catch (error) {
      console.error('Error saving meeting:', error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Meeting Scheduler</h2>
        <button
          onClick={() => {
            setEditingMeeting(null);
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Schedule New Meeting
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <CalendarView meetings={meetings} />
        <UpcomingMeetings 
          meetings={meetings} 
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      {showForm && (
        <MeetingForm 
          onClose={() => {
            setShowForm(false);
            setEditingMeeting(null);
          }}
          onSubmit={handleSubmit}
          initialData={editingMeeting}
        />
      )}
    </div>
  );
};

export default MeetingScheduler;