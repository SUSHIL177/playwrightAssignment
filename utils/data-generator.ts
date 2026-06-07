export class DataGenerator {
    static generateUniqueEmail(): string {
        const timestamp = Date.now();
        return `testuser_${timestamp}@example.com`;
    }

    // Pass the environment-based userProfile directly into the method
    static getStaticMockUser(email: string, template: any) {
        return {
            ...template,
            email: email
        };
    }
}