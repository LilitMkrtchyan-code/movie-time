class ApiQuiz {
  constructor() {
    this.baseUrl = "https://simple-blog-api-red.vercel.app";
  }
  async getQuestions() {
    try {
      const response = await fetch(`${this.baseUrl}/quiz?limit=15`);
      const data = await response.json();
      return {
        success: response.status === 200,
        data,
        error: response.status !== 200 ? response.error : null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  }
}

export const apiQuiz = new ApiQuiz();
