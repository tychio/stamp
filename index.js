import { program } from 'commander'
import { Recipe } from 'muhammara'

program
  .option('-s, --stamp <file>')
  .option('-p, --pdf <file>')
  .option('-t, --top <number>')
  .option('-l, --left <number>')
  .option('-w, --width <number>')


program.parse()

const { stamp, pdf, top, left, width } = program.opts()

function rename(src, suffix) {
  const parts = src.split('.')
  parts.splice(parts.length - 1, 0, suffix)
  return parts.join('.')
}

if (pdf) {
  const paper = new Recipe(pdf, rename(pdf, 'stamp'))
  paper
    .editPage(1)
    .image(stamp, parseInt(left), parseInt(top), {
      width: parseInt(width),
      keepAspectRatio: true
    })
    .endPage()
    .endPDF()
}
