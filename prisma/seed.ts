import { Author, Book, PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();
async function main(): Promise<void> {
    [1, 2, 3, 4, 5].forEach(async (bookId: number): Promise<void> => {
        const book: Book = await prisma.book.create({
            data: {
                title: `Title ${bookId}`,
                description: `Description ${bookId}`,
                page: bookId * 100,
            },
        });

        [1, 2, 3].forEach(async (authorId: number): Promise<void> => {
            const author: Author = await prisma.author.create({
                data: {
                    bookId: book.id,
                    name: `Name ${bookId}${authorId}`,
                },
            });

            console.log(author);
        });

        console.log(book);
    });
}

main()
    .then(async (): Promise<void> => {
        await prisma.$disconnect();
    })
    .catch(async (e: Error): Promise<void> => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
