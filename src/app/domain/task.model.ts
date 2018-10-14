export interface Task {
    id?: string;
    taskListId: string;
    desc: string;
    completed: boolean;
    ownerId: string;
    participantIds: string[];
    dueDate?: Date;
    priority: number;
    remark?: string;
    reminder?: Date;
    createDate?: Date;
}