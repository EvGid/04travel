/**
 * Form submission service
 * Sends contact form data to the server endpoint
 */

export interface ContactFormData {
    name: string;
    phone: string;
    telegram: string;
    interest: 'tour' | 'cabin';
    dates: string;
    comment: string;
}

export interface SubmitResult {
    success: boolean;
    message?: string;
}

/**
 * Submit contact form to the server
 */
export async function submitContactForm(data: ContactFormData): Promise<SubmitResult> {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                message: errorData.message || 'Ошибка отправки заявки',
            };
        }

        const result = await response.json();
        return {
            success: true,
            message: result.message || 'Заявка отправлена',
        };
    } catch (error) {
        console.error('Form submission error:', error);
        return {
            success: false,
            message: 'Не удалось отправить заявку. Проверьте соединение.',
        };
    }
}
