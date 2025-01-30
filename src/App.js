import React, { useState,useEffect } from 'react';
import { Calendar, Clock, Users, X, Edit, Trash, ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarView = ({ meetings }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // const formatDate = (date) => {
  //   return date.toISOString().split('T')[0];
  // };

    
  // const hasMeeting = (day) => {
  //   const dateToCheck = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  //   return meetings.some((meeting) => {
  //     return formatDate(new Date(meeting.date)) === dateToCheck;
  //   });
  // };
  
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
    const colors = ['bg-red-100', 'bg-green-100', 'bg-blue-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100','bg-black-100', 'bg-gray-100', 'bg-indigo-100', 'bg-red-200', 'bg-green-200', 'bg-blue-200', 'bg-yellow-200', 'bg-purple-200', 'bg-pink-200','bg-black-200', 'bg-gray-200', 'bg-indigo-200'];

for (let day = 1; day <= daysInMonth; day++) {
  const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
  const isToday = new Date().toDateString() === dateToCheck;
  const meetingsOnDay = meetings.filter(meeting => new Date(meeting.date).toDateString() === dateToCheck);

  days.push(
    <div 
      key={day}
      className={`h-20 p-1 border relative overflow-auto ${isToday ? 'bg-blue-50' : ''}`}
    >
      <span className={`text-sm ${isToday ? 'font-bold' : ''}`}>{day}</span>
      {meetingsOnDay.length > 0 && (
        <div className="mt-1 space-y-1">
          {meetingsOnDay.map((meeting, index) => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            return (
              <div key={index} className={`text-xs p-1 rounded ${randomColor}`}>
                <strong>{meeting.title}</strong>
                <br />
                {meeting.time}
              </div>
            );
          })}
        </div>
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
        {/* <div className="w-2 h-2 rounded-full bg-blue-500" /> */}
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
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);

  // Fetch meetings on component mount
    useEffect(() => {
      fetchMeetings();
    }, []);
  
    const fetchMeetings = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://backend-meeting-scheduler.vercel.app/api/meetings');
        if (!response.ok) {
          throw new Error('Failed to fetch meetings');
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('API Response:', data); // Log to inspect
          if (Array.isArray(data)) {
            setMeetings(data);
          } else if (data && data.meetings) {
            setMeetings(data.meetings); // Extract meetings array
          } else {
            throw new Error('Unexpected API response format');
          }
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        const response = await fetch(`https://backend-meeting-scheduler.vercel.app/api/meetings/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete meeting');
        }
        
        setMeetings(meetings.filter(meeting => meeting.id !== id));
      } catch (err) {
        console.error('Error deleting meeting:', err);
        // You might want to show an error message to the user
      }
    };
  
    const handleSubmit = async (meetingData) => {
      try {
        if (editingMeeting) {
          // Update existing meeting
          const response = await fetch(`https://backend-meeting-scheduler.vercel.app/api/meetings/${editingMeeting.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(meetingData),
          });
  
          if (!response.ok) {
            throw new Error('Failed to update meeting');
          }
  
          const updatedMeeting = await response.json();
          setMeetings(meetings.map(meeting => 
            meeting.id === editingMeeting.id ? updatedMeeting : meeting
          ));
        } else {
          // Create new meeting
          const response = await fetch('https://backend-meeting-scheduler.vercel.app/api/meetings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(meetingData),
          });
  
          if (!response.ok) {
            throw new Error('Failed to create meeting');
          }
  
          const newMeeting = await response.json();
          setMeetings([...meetings, newMeeting]);
        }
        
        setShowForm(false);
        setEditingMeeting(null);
      } catch (err) {
        console.error('Error saving meeting:', err);
        // You might want to show an error message to the user
      }
    };
  
    if (loading) {
      return (
        <div className="w-full max-w-6xl mx-auto p-4">
          <div className="flex justify-center items-center h-64">
            <span className="text-gray-500">Loading meetings...</span>
          </div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="w-full max-w-6xl mx-auto p-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500">Error: {error}</div>
          </div>
        </div>
      );
    }

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
          onEdit={(meeting) => {
            setEditingMeeting(meeting);
            setShowForm(true);
          }}
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