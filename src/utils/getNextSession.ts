/**
 * Utility to get the next live session date and time based on current day
 * Sessions run Monday-Friday at 7:00 PM IST
 * 
 * Logic:
 * - Sunday: Show Monday's session
 * - Monday (after 7 PM): Show Tuesday's session
 * - Tuesday (after 7 PM): Show Wednesday's session
 * - Wednesday (after 7 PM): Show Thursday's session
 * - Thursday (after 7 PM): Show Friday's session
 * - Friday (after 7 PM): Show Monday's session (next week)
 * - Saturday: Show Monday's session (next week)
 */

interface SessionInfo {
  day: string;
  date: Date;
  formattedDate: string;
  formattedTime: string;
}

export function getNextSession(): SessionInfo {
  const now = new Date();
  
  // Get current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  
  // Session time: 7:00 PM (19:00)
  const sessionHour = 19;
  const sessionMinutes = 0;
  
  // Determine next session day
  let daysToAdd = 0;
  
  if (currentDay === 0) {
    // Sunday -> Monday
    daysToAdd = 1;
  } else if (currentDay === 1) {
    // Monday
    if (currentHour > sessionHour || (currentHour === sessionHour && currentMinutes >= sessionMinutes)) {
      // After Monday's session -> Tuesday
      daysToAdd = 1;
    } else {
      // Before Monday's session -> Monday (today)
      daysToAdd = 0;
    }
  } else if (currentDay === 2) {
    // Tuesday
    if (currentHour > sessionHour || (currentHour === sessionHour && currentMinutes >= sessionMinutes)) {
      // After Tuesday's session -> Wednesday
      daysToAdd = 1;
    } else {
      // Before Tuesday's session -> Tuesday (today)
      daysToAdd = 0;
    }
  } else if (currentDay === 3) {
    // Wednesday
    if (currentHour > sessionHour || (currentHour === sessionHour && currentMinutes >= sessionMinutes)) {
      // After Wednesday's session -> Thursday
      daysToAdd = 1;
    } else {
      // Before Wednesday's session -> Wednesday (today)
      daysToAdd = 0;
    }
  } else if (currentDay === 4) {
    // Thursday
    if (currentHour > sessionHour || (currentHour === sessionHour && currentMinutes >= sessionMinutes)) {
      // After Thursday's session -> Friday
      daysToAdd = 1;
    } else {
      // Before Thursday's session -> Thursday (today)
      daysToAdd = 0;
    }
  } else if (currentDay === 5) {
    // Friday
    if (currentHour > sessionHour || (currentHour === sessionHour && currentMinutes >= sessionMinutes)) {
      // After Friday's session -> Monday (next week)
      daysToAdd = 3; // Friday -> Saturday -> Sunday -> Monday
    } else {
      // Before Friday's session -> Friday (today)
      daysToAdd = 0;
    }
  } else {
    // Saturday -> Monday (next week)
    daysToAdd = 2; // Saturday -> Sunday -> Monday
  }
  
  // Calculate the target date
  const targetDate = new Date(now);
  targetDate.setDate(targetDate.getDate() + daysToAdd);
  targetDate.setHours(sessionHour, sessionMinutes, 0, 0); // Set to 7:00 PM
  
  // Get day name
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const targetDayIndex = targetDate.getDay();
  const dayName = dayNames[targetDayIndex];
  
  // Format date: "9th Nov" format
  const day = targetDate.getDate();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[targetDate.getMonth()];
  
  // Add ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
  const getOrdinalSuffix = (n: number): string => {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  const formattedDate = `${day}${getOrdinalSuffix(day)} ${month}`;
  const formattedTime = '7:00 PM (IST)';
  
  return {
    day: dayName,
    date: targetDate,
    formattedDate,
    formattedTime,
  };
}

