const slugify = require('slugify')

const slugGenerator = (...args) => {
  return slugify(args.join(' '), {
    replacement: '-',
    lower: true,
  })
}

module.exports = slugGenerator
