import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
    [1, 2, 3, 4, 5].forEach(async (bookId) => {
        const book = await prisma.book.create({
            data: {
                title: `Title ${bookId}`,
                description: `Description ${bookId}`,
                page: bookId * 100,
            },
        });

        [1, 2, 3].forEach(async (authorId) => {
            const author = await prisma.author.create({
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
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
