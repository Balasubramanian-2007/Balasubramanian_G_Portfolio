/**
 * ============================================================================
 * PORTFOLIO METRICS & DATA CONFIGURATION (SINGLE SOURCE OF TRUTH)
 * Author: Balasubramanian G (Backend & AI Systems Engineer)
 * ============================================================================
 * 
 * INSTRUCTIONS FOR UPDATING CODING & ACADEMIC METRICS:
 * To update your problem-solving counts or profile links, edit the numbers below.
 * Changing values in this single file automatically re-renders:
 *   1. The Hero Telemetry Strip (verified LeetCode count)
 *   2. Section 06 Coding Metrics header badge
 *   3. LeetCode difficulty breakdown (Easy, Medium, Hard counts & dynamic % bars)
 *   4. SkillRack metric display & institutional status
 *   5. All profile links and verification timestamps
 * 
 * GUIDELINES:
 * - If a metric is not verified or unknown, set its value to `null`.
 *   The UI will automatically render a clean "Update required" fallback.
 * - LeetCode difficulty bar widths are computed dynamically:
 *   percentage = (difficultyCount / totalSolved) * 100
 * - Never add LeetCode and SkillRack counts together into a combined unique total,
 *   as common problems are duplicated across platforms.
 * ============================================================================
 */

window.PORTFOLIO_DATA = {
  academics: {
    cgpa: "9.27",
    cgpaScale: "10.0",
    degree: "B.Tech in Information Technology",
    institution: "National Engineering College",
    duration: "Aug 2024 – Aug 2028"
  },

  codingProfiles: {
    leetcode: {
      platform: "LeetCode",
      username: "BalasubramanianG",
      profileUrl: "https://leetcode.com/u/BalasubramanianG/",
      // Verified live via LeetCode GraphQL API on 2026-10-18:
      totalSolved: 228,
      easy: 132,
      medium: 84,
      hard: 12,
      lastVerified: "2026-10-18",
      status: "VERIFIED"
    },

    skillrack: {
      platform: "SkillRack",
      profileUrl: "https://www.skillrack.com",
      metricLabel: "Programs Completed",
      // SkillRack requires institutional student credentials to view and cannot be verified publicly.
      // Set to null to display "Update required", or set to your verified number (e.g., 2090):
      totalSolved: null,
      lastVerified: null,
      status: "UNVERIFIED_PENDING_CREDENTIALS"
    }
  },

  hardwareTelemetry: {
    radarFrequency: "77GHz",
    radarType: "TI AWR1843 FMCW mmWave",
    microservicesCount: "03+"
  }
};
