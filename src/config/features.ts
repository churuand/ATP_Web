const envFlag = (value: string | undefined): boolean => {
    if (!value) return false;
    return ['true', '1', 'yes', 'on'].includes(value.toLowerCase());
};

const useMockDataEnv = import.meta.env.VITE_USE_MOCK_DATA;

export const FEATURES = {
    // Default to true to preserve previous behaviour unless explicitly disabled via env
    USE_MOCK_DATA: useMockDataEnv === undefined ? true : envFlag(useMockDataEnv),
    ENABLE_STUDENT_PORTAL_DEV_MODE: envFlag(import.meta.env.VITE_ENABLE_STUDENT_PORTAL_DEV_MODE),
};
