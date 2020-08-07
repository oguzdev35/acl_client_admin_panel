// Parse-Dashboard related utilities
import ParseDashboard from 'parse-dashboard';

export const dashboardConstructor = (apps, users) => {
  return {
      dashboard: new ParseDashboard({
          "apps": apps,
          "trustProxy":1,
          "users": users
      }, true)
  }
}