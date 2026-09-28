export type WorkingHoursException = {
  id: string;
  title: string;
};

export type WorkingHours = {
  title: string;
  from: string; // "HH:mm"
  to: string; // "HH:mm"
  exceptions: WorkingHoursException[];
};

export type WorkingHoursDto = {
  from: string;
  to: string;
};

// Raw shape of GET work-time/default/info
export type WorkingHoursInfoResponse = {
  id: number;
  title: string;
  startWorkingHour: string;
  endWorkingHour: string;
};
